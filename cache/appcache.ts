const HALF_AN_HOUR = 30 * 60 * 1000;

class AppCache {
  static data = {}

  static get(key) {
    console.log(`cache ${AppCache.data[key] ? 'hit' : 'miss'}: ${key}`);
    return AppCache.data[key];
  }

  static set(key, value, timeout = HALF_AN_HOUR) {
    if (AppCache.data[key]) {
      console.log('no-op: tried to set cache but cache is already present');
      return;
    }

    AppCache.data = Object.assign({}, AppCache.data, { [key]: value });
    console.log(`cache set ${key}`);

    setTimeout(() => {
      delete AppCache.data[key];
      console.log(`cache invalidated ${key}`);
    }, HALF_AN_HOUR);
  }
}

export default AppCache;
