const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: '192.168.99.100',
  port: 9000,
  useSSL: false,
  accessKey: 'localhost',
  secretKey: 'localhost',
});

async function start() {
  const name = 'muggle.io.modules';
  let bkt = null;
  if (!await minioClient.bucketExists(name)) {
    bkt = await minioClient.makeBucket(name);
  }

}

module.exports = function(moduleName, graph = null) {

};

(async () => {
  try {
    await start();
  } catch (e) {
    console.error(e);
  }
})();
