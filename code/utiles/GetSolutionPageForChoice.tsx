import { HandoutOrTestimonialLink, PageContentType, ResourceLink } from "@/types/dataTypes";

const fetchAnyData = async (APIURL:string): Promise<any> => {
  const res = await fetch(APIURL, {
    method: "GET",
    });

  return await res.json();
}

export default async function get_solution_content(solutionId : string): Promise<[ResourceLink[], HandoutOrTestimonialLink[], PageContentType[]]> {
  let resourceList : ResourceLink[] = [];
  let handoutsOrTestimonialsList : HandoutOrTestimonialLink[] = [];
  let pageContentList : PageContentType[] = []
  const api_url = "http://localhost:1338"

  const solution_json = await fetchAnyData("http://localhost:1338/api/solutions/"+solutionId+"?populate=deep,3")
  console.log(solution_json)
  console.log(solution_json.data.attributes.TestimonialsOrHandouts)
  console.log(solution_json.data.attributes.Resources)

  if(solution_json.data.attributes.TestimonialsOrHandouts){
    console.log("testimonialsexist")
    console.log(solution_json)
    for (let j= 0 ; j < solution_json.data.attributes.TestimonialsOrHandouts.length; j++) {
      console.log(solution_json.data.attributes.TestimonialsOrHandouts[j].Link)
      if (solution_json.data.attributes.TestimonialsOrHandouts[j].Link){
        console.log(solution_json.data.attributes.TestimonialsOrHandouts[j].Title)
        console.log(solution_json.data.attributes.TestimonialsOrHandouts[j].Link)
        handoutsOrTestimonialsList.push({id: ""+j, title: solution_json.data.attributes.TestimonialsOrHandouts[j].Title, url: solution_json.data.attributes.TestimonialsOrHandouts[j].Link})
      } else {
        console.log(solution_json.data.attributes.TestimonialsOrHandouts[j].Title)
        console.log(solution_json.data.attributes.TestimonialsOrHandouts[j].PDF.data.attributes.url)
        handoutsOrTestimonialsList.push({id: ""+j, title: solution_json.data.attributes.TestimonialsOrHandouts[j].Title, url: api_url+solution_json.data.attributes.TestimonialsOrHandouts[j].PDF.data.attributes.url})
      }
    }
  }

  if(solution_json.data.attributes.Resources.length){
    console.log("Resources Exist")
    for (let j= 0 ; j < solution_json.data.attributes.Resources.length; j++) {
      resourceList.push({id: ""+j, title: solution_json.data.attributes.Resources[j].ResourceTitle, url: solution_json.data.attributes.Resources[j].ResourceLink})
    }
  }

  if(solution_json.data.attributes.Block){
    console.log("Block Exist")
    for (const element of solution_json.data.attributes.Block) {

      if (element.__component == "video.video"){
        console.log(api_url+element.VideoMedia.data.attributes.url)
          pageContentList.push({paragraph: "", imageURL: "", videoURL: api_url+element.VideoMedia.data.attributes.url})
      }else if (element.__component == "description-paragraphs.description-paragraphs"){
        console.log(element.DescriptionParagraph)
        pageContentList.push({paragraph: element.DescriptionParagraph, imageURL: "", videoURL: ""})
      } else if (element.__component == "image.image"){
        console.log(api_url+element.ImageMedia.data.attributes.formats.thumbnail.url)
        pageContentList.push({paragraph: "", imageURL: api_url+element.ImageMedia.data.attributes.formats.thumbnail.url, videoURL: ""})
      } else {
        console.log("none")
      }
      
    }
  }







  return [resourceList, handoutsOrTestimonialsList, pageContentList]
}