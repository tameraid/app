import React , {useState , useEffect, Fragment } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


function DevProfile({match}) {
    const [devProfile , setDevProfile] = useState ({})

    useEffect(()=>{
        const getprofiles = async()=>{
            try {
                const token = localStorage.getItem('TOKEN')
                if(token){
                axios.defaults.headers.common = { Authorization: `bearer ${token}` }
                const {data} = await axios.get(`/api/profile/${match.params.id}`)
                setDevProfile(data)
            }
            } catch (error) {
                console.log(error.response.data.error);
            }
        }
        getprofiles()
    },[match.params.id])

    return (
        <Fragment>
            <section className="container">
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
            <div className="profile-grid my-1">
                {/* Top */}
                <div className="profile-top bg-primary p-2">
                <img className="round-img my-1" src={`https://i.picsum.photos/id/${parseInt( Math.random() * 100)}/200/200.jpg`} alt='dev_profile' />
                <h1 className="large">{devProfile.name}</h1>
                <p className="lead">{devProfile.professional}</p>
                <p>{devProfile.location}</p>
                <div className="icons my-1">
                    <Link to="/dev_profile" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe fa-2x" />
                    </Link>
                    <Link to="/dev_profile" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x" />
                    </Link>
                    <Link to="/dev_profile" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x" />
                    </Link>
                    <Link to="/dev_profile" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x" />
                    </Link>
                    <Link to="/dev_profile" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube fa-2x" />
                    </Link>
                    <Link to="/dev_profile" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram fa-2x" />
                    </Link>
                </div>
                </div>
                {/* About */}
                <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{devProfile.bio}</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
                    neque modi perspiciatis similique?
                </p>
                <div className="line" />
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                    <div className="p-1"><i className="fa fa-check" /> HTML</div>
                    <div className="p-1"><i className="fa fa-check" /> CSS</div>
                    <div className="p-1"><i className="fa fa-check" /> JavaScript</div>
                    <div className="p-1"><i className="fa fa-check" /> Python</div>
                    <div className="p-1"><i className="fa fa-check" /> C#</div>
                </div>
                </div>
                {/* Experience */}
                <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {devProfile.experience !== undefined && devProfile.experience.map((exp,index)=>{
                    return <div key={index}>
                    <h3 className="text-dark">{exp.company}</h3>
                    <p>Oct 2011 - Current</p>
                    <p><strong>Position: </strong>{exp.jobTitle}</p>
                    <p>
                    <strong>Description: </strong>Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                    ipsam, sapiente suscipit dicta eius velit amet aspernatur
                    asperiores modi quidem expedita fugit.
                    </p>
                </div>
                })}
                </div>
                {/* Education */}
                <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {devProfile.education !== undefined && devProfile.education.map((educ,index)=>{
                    return <div key={index}>
                    <h3>{educ.school}</h3>
                    <p>Sep 1993 - June 1999</p>
                    <p><strong>Degree: </strong>{educ.degree}</p>
                    <p><strong>Field Of Study: </strong>Computer Science</p>
                    <p>
                    <strong>Description: </strong>Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                    ipsam, sapiente suscipit dicta eius velit amet aspernatur
                    asperiores modi quidem expedita fugit.
                    </p>
                    </div>                
                })}
                </div>
                {/* Github */}
                <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github" /> Github Repos
                </h2>
                <div className="repo bg-white p-1 my-1">
                    <div>
                    <h4><Link to="/dev_profile" target="_blank" rel="noopener noreferrer">Repo One</Link></h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat, laborum!
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li className="badge badge-primary">Stars: 44</li>
                        <li className="badge badge-dark">Watchers: 21</li>
                        <li className="badge badge-light">Forks: 25</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </section>

        </Fragment>
    )
}

export default DevProfile
