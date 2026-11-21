export const metadata = {
  title: "Admin CMS | Cine Connect",
  description: "Cine Connect Enterprise Content Management System",
};

export default function AdminPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#09050f" }}>
      <iframe
        src="/admin/index.html"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Cine Connect Decap CMS Workspace"
      />
    </div>
  );
}
