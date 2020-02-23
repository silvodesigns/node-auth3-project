// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/data.db3'
    }
  },
    // necessary when using sqlite3
    useNullAsDefault: true

  
};
