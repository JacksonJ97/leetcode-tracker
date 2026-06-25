export default function Tracker() {
  const isLoggedIn = false; // Replace with actual authentication logic
  return (
    <main>
      <h1>Tracker</h1>
      {isLoggedIn ? (
        <p>Track your progress</p>
      ) : (
        <p>Login or signup to get started</p>
      )}
    </main>
  );
}
