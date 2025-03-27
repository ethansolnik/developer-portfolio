import dynamic from 'next/dynamic';
import ClientOnly from '../components/ClientOnly';
import YourComponentThatUsesDocument from '../components/YourComponentThatUsesDocument';

// Dynamically import any component that might be using document with no SSR
const ComponentWithDocument = dynamic(
  () => import('../components/ComponentWithDocument'),
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      {/* Other components */}
      <ClientOnly fallback={<div>Loading...</div>}>
        <YourComponentThatUsesDocument />
      </ClientOnly>
      {/* Other components */}
      <ComponentWithDocument />
    </div>
  );
}
