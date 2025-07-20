'use client'
import Header from "@/components/Header";
import ProfileList from "@/components/ProfileList";
import Footer from "@/components/Footer";

export default function Admin() {
  return (
    <>
      <Header />
      <ProfileList />
      <Footer />
    </>
  );
}


// Make a password protection before getting access to the website