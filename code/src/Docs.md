DOCUMENTATION:

---> public
    -> Boston_Children's Hospital_logo.png
    -> CommImg.png
    -> communications.png
    -> doctor.png
    -> footerImg.png
    -> friend.png
    -> home.png
    -> titleImgHome.png

---> src
    -> constants
    -> pages
        -> api
            -> GetSolutionPageForChoices.tsx
            -> hello.ts
            -> TempNextQuestionChoices.tsx
        -> _app.tsx
        -> _document.tsx
        -> AccountPage.tsx
        -> CommunicationPage.tsx
        -> FinalPage.tsx
        -> index.tsx
        -> QuestionareBodyContentPages.tsx
        -> QuestionarePage.tsx
        -> SolutionPages.tsx
    -> styles
        -> global.css
        -> Home.module.css
        -> image12.png
    -> types
        -> api_types.tsx
        -> dataTypes.tsx
    -> Docs.md


### Pages
    * api
        * GetSolutionPageForChoices.tsx
            * getSolutionContent.ts
                * fetchAnyData(APIURL: string): Promise\<any>
                    * Fetches data from the provided API URL using the "GET" method and returns the JSON response

                * getResourceContent(solution_json: any): ResourceLink[]
                    * Processes the solution JSON to extract an array of `ResourceLink` objects containing the id, title, and URL of each resource

                * getTestimonialOrHandoutContent(api_url: string, solution_json: any): HandoutOrTestimonialLink[]
                    * Processes the solution JSON to extract an array of `HandoutOrTestimonialLink` objects containing the id, title, and URL of each testimonial or handout

                * getPageContent(api_url: string, solution_json: any): PageContentType[]
                    * Processes the solution JSON to extract an array of `PageContentType` objects containing the paragraphs, image URLs, and video URLs of each page content item

                * getSolutionContent(solutionId: string): Promise\<[any[], any[], any[]]>
                    * Given a solutionId, fetches the solution data and returns a tuple containing the lists of ResourceLink, HandoutOrTestimonialLink, and PageContentType objects
        * hello.ts
            * handler(req: NextApiRequest, res: NextApiResponse<Data>): void
                * A Next.js API route handler function that takes a `NextApiRequest` object and a `NextApiResponse<Data>` object
                * Responds with a status code of 200 and a JSON object containing the name 'John Doe'
        * TempNextQuestionChoices.tsx
            * tempNextChoiceSelectionFromJson(clickedChoice: IChoice): Promise<[IQuestion, IChoice[], boolean, ISolution]>
                * Given a `clickedChoice` object of type `IChoice`, this function returns a Promise with an array containing:
                    * An `IQuestion` object representing the next question
                    * An array of `IChoice` objects representing the next set of choices
                    * A boolean indicating if the current choice has a solution
                    * An `ISolution` object representing the solution associated with the current choice
        
                * This function fetches data from the API based on the input `clickedChoice` object and processes the data to return the required information about the next question, its choices, and any solution associated with the input choice. 
                
                * If the input choice does not have a next question or solution, the function returns an empty question, an empty array of choices, and a boolean value set to false.
