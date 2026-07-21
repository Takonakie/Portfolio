const API_BASE = "http://localhost:3001";

export async function savePortfolioData(data: any, commitMessage?: string) {
  const response = await fetch(`${API_BASE}/api/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, commitMessage }),
  });
  return response.json();
}

export async function uploadPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/upload-photo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64: reader.result as string,
            filename: file.name,
          }),
        });
        const result = await response.json();
        if (result.success) {
          resolve(result.photoUrl);
        } else {
          reject(new Error(result.error || "Upload failed"));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export async function fetchPortfolioData() {
  const response = await fetch(`${API_BASE}/api/data`);
  return response.json();
}
