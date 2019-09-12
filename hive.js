const {
  Configuration,
  HiveConnection,
  IDLContainer,
} = require('jshs2');

const options = {
  auth: 'NOSASL',
  host: 'myServer',
  port: myPort,
};

const hiveConfig = new Configuration(options);
const idl = new IDLContainer();

async function main() {
  await idl.initialize(hiveConfig);
  const connection = await new HiveConnection(hiveConfig, idl);
  const cursor = await connection.connect();
  const res = await cursor.execute('SELECT * FROM orders LIMIT 10');

  if (res.hasResultSet) {
    const fetchResult = await cursor.fetchBlock();
    fetchResult.rows.forEach((row) => {
      console.log(row);
    });
  }

  cursor.close();
  connection.close();
}

main().then(() => {
  console.log('Finished.');
});
