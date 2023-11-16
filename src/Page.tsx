import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Firestore, doc, getDoc } from "firebase/firestore";
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'

export default function Page({firestore} : {firestore: Firestore}) {
    let params = useParams();

    const [isLoadingPageContent, setIsLoadingPageContent] = useState(false)
    const [showPageContentLoadError, setShowPageContentLoadError] = useState(false)
    const [pageContent, setPageContent] = useState({} as {id: string, title: string, markdown: Array<string>})

    async function getData() {
        setIsLoadingPageContent(true)

        const docSnap = await getDoc(doc(firestore, `/pages/${params.pageID}`))

        if (!docSnap.exists) {
            console.log(`page doesn't exist`)
            // error
            return
        }

        const docData = docSnap.data() as {title: string, markdown: Array<string>}
        console.log(docData)

        setPageContent({
            id: docSnap.id,
            title: docData.title,
            markdown: docData.markdown
        })

        console.log('loaded page data.')

        setIsLoadingPageContent(false)
        return
    }

    useEffect(() => {
        getData()
    }, [params, Object.keys(pageContent).length == 0])

    function getMarkdownContentComponent() {
        const markdown = pageContent.markdown.join('\n')

        return <Markdown>{markdown}</Markdown>
    }
    
    if (isLoadingPageContent || Object.entries(pageContent).length == 0) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <>
            <div className="px-1 d-flex justify-content-center" style={{backgroundColor: ''}}>
                <div className="pt-4" style={{maxWidth: '900px', backgroundColor: ''}}>
                    <div>
                        <h1>{pageContent.title}</h1>
                    </div>
                    <div className="py-2" id="md-root" >
                        {getMarkdownContentComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}