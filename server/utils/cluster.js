const cluster = require("cluster");
const os = require("os");

const setupCluster = (startServer) => {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    console.log(`🧠 Primary process ${process.pid} is running`);
    console.log(`⚙️  Spawning ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`❌ Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    startServer(); // start the Express + Socket.io server
  }
};

module.exports = setupCluster;
