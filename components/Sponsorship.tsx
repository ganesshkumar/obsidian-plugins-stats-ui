import { Button } from "flowbite-react";

export const Sponsorship = (props) => {
  const sponsors = props.sponsors || [];
  return (
    <div className="bg-transparent mt-16">
      <div className="max-w-6xl mx-auto px-2 flex flex-col">
        <div className="text-center mb-4 font-bold">Sponsors</div>
        <FirstSponsorship />
      </div>
    </div>
  )
}

const FirstSponsorship = () => {
  return (
    <div className="flex justify-center">
      <a href="mailto:rpganesshkumar@gmail.com?subject=Obsidian Stats - Sponsorship">
        <Button color="light" className="border-2 border-purple-700 rounded-none text-purple-700">
          Become a sponsor
        </Button>
      </a>
    </div>
  )
}
