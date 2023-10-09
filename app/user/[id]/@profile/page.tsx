import { notFound } from "next/navigation";
import style from './profile.module.scss'

async function getUser(id: string) {
  const req = await fetch('http://localhost:3000/api/getUser', { method: 'POST', body: JSON.stringify(id)})
  const user = await req.json()
  
  if(user.message === 'User not found') { 
    notFound()
  }

  return user
}

const Profile = async ({ params }: { params: { id: string } }) => {
  const userReq = await getUser(params.id)
  const { login, name, surname, email, currency} = userReq

  return ( 
    <section className={style.userProfile}>
      <h1 className={style.header}>{login}</h1>
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
        <button className={style.button}>Pick avatar</button>
        <button className={style.button}>Change password</button>
      </div>
    </section>
   );
}
 
export default Profile;