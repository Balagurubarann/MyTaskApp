import React from "react";
import { ListChecks } from "lucide-react";

function Header(): React.ReactNode {
  return (
    <section className="h-[10vh] mb-2 flex items-center px-10 drop-shadow-md sticky top-0">
      <ListChecks size={24} />
      <h3 className="text-2xl text-black px-4 py-6 drop-shadow-md tracking-wide">
        MyTaskApp
      </h3>
    </section>
  );
}

export default Header;
