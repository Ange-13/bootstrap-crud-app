function DataTable() {
  const users = [
    { id: 1, name: "John", password: "password123" },
    { id: 2, name: "Alice", password: "pass456" },
    { id: 3, name: "Bob", password: "secret789" },
  ];

  return (
    <div className="container">
      <h1 className="my-4">User Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
