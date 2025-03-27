const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", returnChecker);

  function returnChecker(error, stdout) {
    if (!stdout.includes("accepting connections")) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    process.stdout.write(
      "\n\n🟢 Postgres está pronto e aceitando conexões\n\n",
    );
  }
}

process.stdout.write("🔴 Aguardando Postgres aceitar conexões\n");
checkPostgres();
