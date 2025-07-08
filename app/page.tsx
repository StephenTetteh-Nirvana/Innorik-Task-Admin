import { redirect } from "next/navigation";

export default function Home() {
  const user = false;
  
  if (!user){
    redirect('/login')
  }else{
    redirect('/dashboard')
  }


  return (
    <div className="">
      <main className="">
        <h2>Home Page</h2>
      </main>
    </div>
  );
}
