import { Button } from "flowbite-react";
import { Footer } from "../components/Footer"
import Header from "../components/Header"
import InfoBar from "../components/InfoBar"
import Navbar from "../components/Navbar"
import { useState } from "react";
import Image from "next/image";

const Migrate = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleExport = () => {
    const favorites = localStorage.getItem("favorites");
    if (!favorites) {
      setInfo("No favorites found in localStorage. Nothing to migrate");
      return;
    }
    const blob = new Blob([favorites], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "favorites.json";
    link.click();
    URL.revokeObjectURL(url);
    setSuccess("Favorites exported successfully. Visit www.obsidianstats.com/migrate on any device to import the favorites.");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (Array.isArray(data) && data.every((item) => typeof item === "string")) {
            localStorage.setItem("favorites", JSON.stringify(data));
            setSuccess("Favorites imported successfully.");
          } else {
            setError("Invalid file format. Expected an array of strings (pluginIds).");
          }
        } catch {
          setError("Failed to parse JSON.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div>
      <Header
        title="Migrate your favorites plugins list across devices - Export & Import Guide"
        description="Learn how to export and import your favorite plugins list across different devices. Follow our step-by-step guide to easily migrate your favorites from localStorage."
        canonical="https://www.obsidianstats.com/migrate"
        image="https://www.obsidianstats.com/logo-512.png"
      />
      <Navbar current="migrate" />
      <div className="bg-white pt-5 grow">
        <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
          <InfoBar title="migrate" />
          <Image src="/images/undraw/moving_2cfm.png" alt="Migrate" width={500} height={240} className="mx-auto mb-8 opacity-50"/>
          <p className="text-center text-gray-800">Favorites are stored locally in your browser using `localStorage`.<br/> To transfer them, you can export the data as a JSON file and then import it on another device or domain. <br/> This allows you to migrate your favorite plugins across devices or from the old domain to the new domain (<a className="underline" href="https://www.obsidianstats.com/migrate">www.obsidianstats.com</a>).</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 py-4 mt-4">
            <Button color="dark" onClick={handleExport}>Export Favorites</Button>
            <Button color="dark" onClick={handleImport}>Import Favorites</Button>
          </div>
          {error && <p className="text-center text-red-700">Error: {error}</p>}
          {success && <p className="text-center text-green-500">Success: {success}</p>}
          {info && <p className="text-center text-yellow-400">Info: {info}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Migrate;
