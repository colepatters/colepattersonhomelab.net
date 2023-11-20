import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Firestore, doc, getDoc } from "firebase/firestore";
import Markdown from "markdown-to-jsx"
import remarkGfm from 'remark-gfm'
import { Image, Modal, Button } from "react-bootstrap";

export default function Page({firestore} : {firestore: Firestore}) {
    let params = useParams();

    const [isLoadingPageContent, setIsLoadingPageContent] = useState(false)
    const [showPageContentLoadError, setShowPageContentLoadError] = useState(false)
    const [pageContent, setPageContent] = useState({} as {id: string, title: string, markdown: Array<string>})

    const [showImageModal, setShowImageModal] = useState(false)
    const [imageModalSource, setImageModalSource] = useState("")

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

    function handleShowImageModal(src: string) {
        setImageModalSource(src)
        setShowImageModal(true)
    }

    function getImageComponent(props) {

        return (
            <div className="d-flex" style={{backgroundColor: 'red'}}>
                <div className="p-2">
                    <Image fluid src={props.src} onClick={() => handleShowImageModal(props.src)} />
                </div>
            </div>
        )
    }

    function getLinkComponent(props) {

        return (
            <a href={props.href} target="_blank">{props.children[0]}</a>
        )
    }

    function getMarkdownContentComponent() {
        const markdown = pageContent.markdown.join('\n')

        return <Markdown
                options={{
                    overrides: {
                        img: {
                            component: getImageComponent
                        },
                        a: {
                            component: getLinkComponent
                        }
                    }
                }}
                >{markdown}</Markdown>
    }
    
    if (isLoadingPageContent || Object.entries(pageContent).length == 0) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <>
            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image fluid src={imageModalSource} />
                </Modal.Body>
                <Modal.Footer>
                    <Button href={imageModalSource} target="_blank">Open in new tab</Button>
                    <Button onClick={() => setShowImageModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <div className="px-1 d-flex justify-content-center" style={{backgroundColor: ''}}>
                <div className="pt-4" style={{maxWidth: '900px', backgroundColor: ''}}>
                    <div>
                        <h1>{pageContent.title}</h1>
                    </div>
                    <div className="py-2" id="md-root">
                        {getMarkdownContentComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}