import { ChangeEvent, DragEvent, KeyboardEvent, PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Download, ImagePlus, LockKeyhole, Minus, Move, Plus, RotateCcw, Share2 } from "lucide-react";
import type { PhotoFrameDefinition } from "@/config/photoFrames";

type LoadedPhoto = {
  source: CanvasImageSource;
  width: number;
  height: number;
  dispose: () => void;
};

type Transform = { base: number; zoom: number; x: number; y: number };

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_DECODED_SIDE = 4096;
const MAX_DECODED_PIXELS = 16_000_000;

function canvasBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Falha ao gerar a imagem.")), "image/png");
  });
}

export function PhotoFrameEditor({ frame }: { frame: PhotoFrameDefinition }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<LoadedPhoto | null>(null);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<null | { distance: number; transform: Transform; anchorX: number; anchorY: number }>(null);
  const [photo, setPhoto] = useState<LoadedPhoto | null>(null);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [transform, setTransform] = useState<Transform>({ base: 1, zoom: 1, x: 0, y: 0 });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [lowResolution, setLowResolution] = useState(false);
  const [showProfileGuide, setShowProfileGuide] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const clampTransform = useCallback((next: Transform, source = photoRef.current) => {
    if (!source) return next;
    const { photoArea } = frame;
    const width = source.width * next.base * next.zoom;
    const height = source.height * next.base * next.zoom;
    const minX = photoArea.x + photoArea.width - width;
    const minY = photoArea.y + photoArea.height - height;
    return {
      ...next,
      x: Math.min(photoArea.x, Math.max(minX, next.x)),
      y: Math.min(photoArea.y, Math.max(minY, next.y)),
    };
  }, [frame]);

  const fitPhoto = useCallback((loaded: LoadedPhoto) => {
    const { photoArea } = frame;
    const base = Math.max(photoArea.width / loaded.width, photoArea.height / loaded.height);
    const width = loaded.width * base;
    const height = loaded.height * base;
    const initial = clampTransform({
      base,
      zoom: 1,
      x: photoArea.x + (photoArea.width - width) / 2,
      y: photoArea.y - frame.initialTopBias * height,
    }, loaded);
    setTransform(initial);
    setLowResolution(base > 1.6);
  }, [clampTransform, frame]);

  useEffect(() => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => setFrameImage(image);
    image.onerror = () => setError("Não foi possível carregar a moldura oficial.");
    image.src = frame.frameSrc;
  }, [frame.frameSrc]);

  const drawComposition = useCallback((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if (!context) return;
    canvas.width = frame.output.width;
    canvas.height = frame.output.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = frame.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (photo) {
      context.save();
      context.beginPath();
      context.rect(frame.photoArea.x, frame.photoArea.y, frame.photoArea.width, frame.photoArea.height);
      context.clip();
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(
        photo.source,
        transform.x,
        transform.y,
        photo.width * transform.base * transform.zoom,
        photo.height * transform.base * transform.zoom,
      );
      context.restore();
    }
    if (frameImage) context.drawImage(frameImage, 0, 0, frame.output.width, frame.output.height);
  }, [frame, frameImage, photo, transform]);

  useEffect(() => {
    if (canvasRef.current) drawComposition(canvasRef.current);
  }, [drawComposition]);

  useEffect(() => () => photoRef.current?.dispose(), []);

  const decodeFile = async (file: File): Promise<LoadedPhoto> => {
    let source: ImageBitmap | HTMLImageElement;
    let dispose = () => {};
    if ("createImageBitmap" in window) {
      source = await createImageBitmap(file, { imageOrientation: "from-image" });
      dispose = () => (source as ImageBitmap).close();
    } else {
      const url = URL.createObjectURL(file);
      source = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      });
      dispose = () => URL.revokeObjectURL(url);
    }

    const width = source.width;
    const height = source.height;
    const scale = Math.min(1, MAX_DECODED_SIDE / Math.max(width, height), Math.sqrt(MAX_DECODED_PIXELS / (width * height)));
    if (scale >= 1) return { source, width, height, dispose };

    const resized = document.createElement("canvas");
    resized.width = Math.max(1, Math.round(width * scale));
    resized.height = Math.max(1, Math.round(height * scale));
    const context = resized.getContext("2d");
    if (!context) {
      dispose();
      throw new Error("Canvas indisponível.");
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(source, 0, 0, resized.width, resized.height);
    dispose();
    return { source: resized, width: resized.width, height: resized.height, dispose: () => {} };
  };

  const loadFile = async (file?: File) => {
    if (!file) return;
    setError("");
    setStatus("");
    const validExtension = /\.(jpe?g|png|webp)$/i.test(file.name);
    if (!ACCEPTED_TYPES.includes(file.type.toLowerCase()) && !validExtension) {
      setError("Formato não aceito. Envie uma imagem JPG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Essa imagem é muito grande. Escolha uma foto de até 25 MB.");
      return;
    }
    try {
      setStatus("Abrindo sua foto...");
      const loaded = await decodeFile(file);
      photoRef.current?.dispose();
      photoRef.current = loaded;
      setPhoto(loaded);
      fitPhoto(loaded);
      setStatus("");
    } catch {
      setError("Não foi possível abrir essa imagem. Tente outra foto.");
      setStatus("");
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void loadFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const updateZoom = useCallback((value: number, anchorX?: number, anchorY?: number) => {
    setTransform((current) => {
      const zoom = Math.min(frame.maxZoom, Math.max(1, value));
      const ax = anchorX ?? frame.photoArea.x + frame.photoArea.width / 2;
      const ay = anchorY ?? frame.photoArea.y + frame.photoArea.height / 2;
      const ratio = zoom / current.zoom;
      return clampTransform({ ...current, zoom, x: ax - (ax - current.x) * ratio, y: ay - (ay - current.y) * ratio });
    });
  }, [clampTransform, frame]);

  const movePhoto = useCallback((dx: number, dy: number) => {
    setTransform((current) => clampTransform({ ...current, x: current.x + dx, y: current.y + dy }));
  }, [clampTransform]);

  const canvasPoint = (clientX: number, clientY: number) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: (clientX - rect.left) * frame.output.width / rect.width, y: (clientY - rect.top) * frame.output.height / rect.height };
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!photo) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointersRef.current.values()];
    if (points.length === 2) {
      const anchor = canvasPoint((points[0].x + points[1].x) / 2, (points[0].y + points[1].y) / 2);
      pinchRef.current = { distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y), transform, anchorX: anchor.x, anchorY: anchor.y };
    }
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const previous = pointersRef.current.get(event.pointerId);
    if (!photo || !previous) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointersRef.current.values()];
    if (points.length >= 2 && pinchRef.current) {
      const pinch = pinchRef.current;
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const zoom = Math.min(frame.maxZoom, Math.max(1, pinch.transform.zoom * distance / Math.max(1, pinch.distance)));
      const ratio = zoom / pinch.transform.zoom;
      setTransform(clampTransform({ ...pinch.transform, zoom, x: pinch.anchorX - (pinch.anchorX - pinch.transform.x) * ratio, y: pinch.anchorY - (pinch.anchorY - pinch.transform.y) * ratio }));
    } else {
      const rect = canvasRef.current!.getBoundingClientRect();
      movePhoto((event.clientX - previous.x) * frame.output.width / rect.width, (event.clientY - previous.y) * frame.output.height / rect.height);
    }
    event.preventDefault();
  };

  const endPointer = (event: PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    pinchRef.current = null;
  };

  const onEditorKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, [number, number]> = { ArrowUp: [0, -20], ArrowDown: [0, 20], ArrowLeft: [-20, 0], ArrowRight: [20, 0] };
    if (moves[event.key]) {
      event.preventDefault();
      const multiplier = event.shiftKey ? 3 : 1;
      movePhoto(moves[event.key][0] * multiplier, moves[event.key][1] * multiplier);
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault(); updateZoom(transform.zoom + 0.05);
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault(); updateZoom(transform.zoom - 0.05);
    }
  };

  const makeBlob = async () => {
    const output = document.createElement("canvas");
    drawComposition(output);
    return canvasBlob(output);
  };

  const download = async () => {
    if (!photo) return;
    try {
      setStatus("Preparando sua foto...");
      const blob = await makeBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = frame.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      setStatus("Sua foto está pronta!");
    } catch {
      setStatus("Não foi possível gerar o arquivo. Tente novamente.");
    }
  };

  const canShareFiles = (() => {
    if (typeof navigator.share !== "function" || typeof navigator.canShare !== "function" || typeof File === "undefined") return false;
    try {
      const probe = new File([new Blob(["preview"], { type: "image/png" })], "preview.png", { type: "image/png" });
      return navigator.canShare({ files: [probe] });
    } catch {
      return false;
    }
  })();
  const share = async () => {
    if (!photo || !canShareFiles) return;
    try {
      setStatus("Preparando sua foto...");
      const blob = await makeBlob();
      const file = new File([blob], frame.fileName, { type: "image/png" });
      if (!navigator.canShare?.({ files: [file] })) throw new Error("Compartilhamento indisponível");
      await navigator.share({ files: [file], title: `${frame.title} — ${frame.candidateName} ${frame.candidateNumber}` });
      setStatus("");
    } catch (shareError) {
      if ((shareError as DOMException).name !== "AbortError") setStatus("O compartilhamento não está disponível. Você ainda pode baixar a foto.");
      else setStatus("");
    }
  };

  const restart = () => {
    photoRef.current?.dispose();
    photoRef.current = null;
    setPhoto(null);
    setTransform({ base: 1, zoom: 1, x: 0, y: 0 });
    setError("");
    setStatus("");
    setLowResolution(false);
  };

  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    void loadFile(event.dataTransfer.files?.[0]);
  };

  if (!photo) {
    return (
      <div className={`frame-upload ${dragOver ? "is-over" : ""}`} onDragEnter={(event) => { event.preventDefault(); setDragOver(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragOver(false)} onDrop={drop}>
        <span className="frame-upload-icon"><ImagePlus aria-hidden="true"/></span>
        <h2>Envie sua foto</h2>
        <p>Escolha uma foto do seu celular ou computador para começar.</p>
        <button className="frame-button frame-button--secondary" type="button" onClick={() => inputRef.current?.click()} data-campaign-event="photo_frame_upload" data-campaign-label={frame.candidateName}>Escolher foto</button>
        <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" onChange={onFileChange}/>
        <span className="frame-private"><LockKeyhole aria-hidden="true"/>A foto é processada no seu dispositivo e não fica armazenada.</span>
        {status && <p className="frame-status" role="status">{status}</p>}
        {error && <p className="frame-error" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <div className="frame-studio">
      <div className="frame-editor-head">
        <span>Passo 2 de 2</span><h2>Ajuste sua foto</h2><p>Arraste para posicionar e use o zoom até encontrar o melhor enquadramento.</p>
        {lowResolution && <p className="frame-warning">A foto precisou ser ampliada e pode ficar um pouco borrada. Se puder, use a imagem original.</p>}
      </div>
      <div className="frame-studio-grid">
        <div>
          <div className="frame-canvas-wrap" role="application" tabIndex={0} aria-label="Área de ajuste da foto. Arraste para mover, use pinça para ampliar ou as setas do teclado." onKeyDown={onEditorKeyDown} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endPointer} onPointerCancel={endPointer}>
            <canvas ref={canvasRef} aria-label={`Prévia da foto com a moldura ${frame.title}`}/>
            {showProfileGuide && <span className="frame-profile-guide" aria-hidden="true"/>}
            <span className="frame-drag-hint"><Move aria-hidden="true"/>Arraste para posicionar</span>
          </div>
          <label className="frame-guide-toggle"><input type="checkbox" checked={showProfileGuide} onChange={(event) => setShowProfileGuide(event.target.checked)}/> Mostrar recorte do perfil</label>
        </div>
        <div className="frame-controls">
          <div><h3>Mover</h3><div className="frame-move-pad">
            <button className="is-up" type="button" onClick={() => movePhoto(0, -20)} aria-label="Mover foto para cima"><ArrowUp/></button>
            <button className="is-left" type="button" onClick={() => movePhoto(-20, 0)} aria-label="Mover foto para a esquerda"><ArrowLeft/></button>
            <span><Move/></span>
            <button className="is-right" type="button" onClick={() => movePhoto(20, 0)} aria-label="Mover foto para a direita"><ArrowRight/></button>
            <button className="is-down" type="button" onClick={() => movePhoto(0, 20)} aria-label="Mover foto para baixo"><ArrowDown/></button>
          </div></div>
          <div><h3>Zoom</h3><div className="frame-zoom">
            <button type="button" onClick={() => updateZoom(transform.zoom - .1)} aria-label="Diminuir zoom"><Minus/></button>
            <input type="range" min="100" max={frame.maxZoom * 100} value={Math.round(transform.zoom * 100)} onChange={(event) => updateZoom(Number(event.target.value) / 100)} aria-label="Nível de zoom"/>
            <button type="button" onClick={() => updateZoom(transform.zoom + .1)} aria-label="Aumentar zoom"><Plus/></button>
            <output>{Math.round(transform.zoom * 100)}%</output>
          </div></div>
          <div className="frame-reset-actions">
            <button type="button" onClick={() => fitPhoto(photo)}><Move/>Centralizar</button>
            <button type="button" onClick={restart}><RotateCcw/>Recomeçar</button>
          </div>
        </div>
      </div>
      <div className="frame-finish">
        <div><h3>Gostou do resultado?</h3><p>Baixe em alta qualidade e publique nas suas redes.</p></div>
        <div className="frame-finish-actions">
          <button className="frame-button frame-button--accent" type="button" onClick={() => void download()} data-campaign-event="photo_frame_download" data-campaign-label={frame.candidateName}><Download/>Baixar minha foto</button>
          {canShareFiles && <button className="frame-button frame-button--share" type="button" onClick={() => void share()} data-campaign-event="photo_frame_share" data-campaign-label={frame.candidateName}><Share2/>Compartilhar</button>}
        </div>
        <p className="frame-status" role="status" aria-live="polite">{status}</p>
      </div>
    </div>
  );
}
