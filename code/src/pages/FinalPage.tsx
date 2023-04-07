import React from 'react'
import { FooterLinks } from "../../components/Footer/Footer"
import Nav from '../../components/Navbar/Nav'
import Resources from '../../components/MainBody/Resources'
import { dummyResourceLinks } from '@/constants/dummyData'



const FinalPage = () => {
  return (
    <div>
      <Nav></Nav>
      <Resources data={dummyResourceLinks}></Resources>
      <FooterLinks data={[{links:[{label:"About Us", link: "https://www.childrenshospital.org/about-us"}, {label:"Virtual Visits", link: "https://www.childrenshospital.org/programs/virtual-visits"},{label:"MyChildren's Patient Portal", link: "https://apps.childrenshospital.org/mychildrens/index.html"},{label:"Quality and Patient Safety",link: "https://www.childrenshospital.org/about-us/patient-safety-quality"},{label:"Career Opportunities",link: "https://www.childrenshospital.org/career-opportunities"},{label:"Locations",link: "https://www.childrenshospital.org/about-us/locations"},{label:"Education & Training",link: "https://dme.childrenshospital.org/"}]}]}/>
    </div> 
  )
}

export default FinalPage