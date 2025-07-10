import { v4 as uuidv4 } from "uuid";

export default function ErrorMessage({ errorArray }) {
  if (!errorArray) return null;

  return (
    <div className="error-message">
      <p>
        <strong>There was an error with that:</strong>
      </p>
      <ul>
        {Array.isArray(errorArray)
          ? errorArray.map((error) => {
              return <li key={uuidv4()}>{error.message}</li>;
            })
          : errorArray}
      </ul>
    </div>
  );
}
