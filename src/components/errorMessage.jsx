export default function ErrorMessage({ errorArray }) {
  if (!errorArray) return null;

  console.log(errorArray);
  return (
    <div className="errorMessage">
      <p><strong>There was an error with that:</strong></p>
      <ul>
        {Array.isArray(errorArray)
          ? errorArray.map((error) => {
              return <li>{error.message}</li>;
            })
          : errorArray}
      </ul>
    </div>
  );
}
