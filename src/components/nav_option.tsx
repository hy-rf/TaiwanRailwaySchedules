export default function NavOpt({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <a
        className="block py-2 px-3 text-gray-900 rounded dark:text-white"
        href={href}
      >
        {text}
      </a>
    </li>
  );
}
