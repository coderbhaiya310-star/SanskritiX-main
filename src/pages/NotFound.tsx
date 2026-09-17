import NotFoundBlock from '../components/NotFoundBlock';

export default function NotFound() {
  return (
    <NotFoundBlock
      title="Page not found"
      description="The page you're looking for doesn't exist in this SanskritiX ."
      backTo="/"
      backLabel="Back to Home"
    />
  );
}
