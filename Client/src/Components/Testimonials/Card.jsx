function Card(props) {
  return (
    <div className="main-test">
      <div className="Client-Card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Render the image correctly */}
        <img
          src={props.img} // Correctly bind the avatar prop
          alt="avatar"
          style={{ borderRadius: "50%", width: "100px", height: "100px", objectFit: "cover" }} // Add some styling
        />
        <p style={{ marginTop: 25, textAlign: "center" }}>
          <span>&ldquo;</span>
          {props.message}
        </p>
        <p>
          <span className="Name">
            {props.name}, {props.location}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Card;

