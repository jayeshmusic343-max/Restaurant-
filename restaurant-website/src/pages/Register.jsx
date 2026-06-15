function Register() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
      }}
    >

      <form
        style={{
          width: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "orange"
          }}
        >
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Name"

          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"

          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"

          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            background: "orange",
            color: "white",
            fontSize: "18px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;