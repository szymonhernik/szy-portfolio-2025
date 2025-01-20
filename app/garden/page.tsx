export default function Page() {
  return <Garden />;
}

function Garden() {
  return (
    <div className="col-span-12 bg-green-200">
      <h1 className="mb-8">An overgrown garden of inspirations</h1>
      <div>This is full page version of the garden modal</div>
    </div>
  );
}
