// components/Layout.tsx
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div class="layout">
      <Header />
      <div class="main-content">
        <Sidebar />
        <div class="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}
