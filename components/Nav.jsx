"use client";
import assets from "@assets/assets";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const providersRes = await getProviders();
      setProviders(providersRes);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src={assets.images.logo}
          alt="Promptopia Logo"
          width={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {
        /*  Checks wether the user is logged in or not */
        session?.user ? (
          <div>
            {/**Desktop navigation */}
            <div className="sm:flex relative hidden">
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                  Create Post
                </Link>
                <button type="button" className="outline_btn" onClick={signOut}>
                  Sign Out
                </button>
                <Link href="/profile">
                  <Image
                    src={session?.user.image}
                    alt="Profile Image"
                    width={37}
                    height={37}
                    className="rounded-full"
                  />
                </Link>
              </div>
            </div>
            {/**Mobile Navigation */}
            <div className="sm:hidden flex relative">
              <Image
                src={session?.user.image}
                alt="Profile Image"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => setToggleDropDown((prev) => !prev)}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link self-center"
                    onClick={() => setToggleDropDown((prev) => !prev)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link self-center"
                    onClick={() => setToggleDropDown((prev) => !prev)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={signOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {`Sign In with ${provider.name}`}
                </button>
              ))}
          </>
        )
      }
    </nav>
  );
};

export default Nav;
