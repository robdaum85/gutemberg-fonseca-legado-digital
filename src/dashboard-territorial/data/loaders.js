// Carregamento memoizado dos JSON gerados por scripts/territorial/build-territorial-data.mjs.
const BASE = '/data/territorial/';
const cache = new Map();

function fetchJson(file) {
  if (!cache.has(file)) {
    const promise = fetch(BASE + file).then((res) => {
      if (!res.ok) throw new Error(`Não foi possível carregar ${file} (HTTP ${res.status}).`);
      return res.json();
    });
    promise.catch(() => cache.delete(file)); // permite nova tentativa
    cache.set(file, promise);
  }
  return cache.get(file);
}

export const loadTerritorial = () => fetchJson('territorial.json');
export const loadGeojson = () => fetchJson('rj_municipios.geojson');

// Locais: expande arrays posicionais em objetos uma única vez.
export const loadLocais = (() => {
  let memo;
  return () => {
    memo ??= fetchJson('locais.json').then(({ municipios, rows }) => rows.map(([m, zona, nome, endereco, votos], idx) => ({
      idx, key: municipios[m], zona, nome, endereco, votos,
    })));
    memo.catch(() => { memo = undefined; });
    return memo;
  };
})();

// Seções: só carregadas quando o usuário abre o detalhe (SPEC §25, lazy-load).
export const loadSecoes = (() => {
  let memo;
  return () => {
    memo ??= Promise.all([fetchJson('secoes.json'), loadLocais()]).then(([{ rows }, locais]) => rows.map(([localIdx, secao, votos]) => {
      const local = locais[localIdx];
      return { key: local.key, zona: local.zona, secao, localIdx, local: local.nome, votos };
    }));
    memo.catch(() => { memo = undefined; });
    return memo;
  };
})();
