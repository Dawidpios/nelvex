import { notFound } from "next/navigation";
import style from './profile.module.scss'
import Avatar from "./Avatar";
import PasswordChange from "./PasswordChange";

async function getUser(id: string) {
  const req = await fetch(process.env.URL_API +'/getUser', { method: 'POST', body: JSON.stringify(id), next:{ tags: ['getUser'] }})
  
  const user = await req.json()

  if(user.message === 'User not found') { 
    notFound()
  }

  return user
}

const Profile = async ({ params, searchParams }: { params: { id: string }, searchParams: Record<string, string> }) => {
  const userReq = await getUser(params.id)
  const { login, name, surname, email, currency} = userReq

  return ( 
    <section className={style.userProfile}>
      <h1 className={style.header}>User : <span style={{color: '#011627'}}>{login}</span></h1>
      <div className={style.information}>
        <h3 className={style.smallHeader}>User information</h3>
        <p className={style.paragraph}><b>Name: </b>{name}</p>
        <p className={style.paragraph}><b>Surname:</b> {surname}</p>
        <p className={style.paragraph}><b>Email:</b> {email}</p>
      </div>
      <div className={style.currency}>
        <h3 className={style.smallHeader}>User currency</h3>
        <p className={style.paragraph}>{currency ? currency : "You do not have any currency yet"}</p>
      </div>
      <div className={style.controlPanel}>
        <h3 className={style.smallHeader}>Control panel</h3>
        <Avatar id={params.id}></Avatar>
        <PasswordChange />
      </div>
    </section>
   );
}
 
export default Profile;