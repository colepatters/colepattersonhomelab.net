import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { Route, Routes } from "react-router-dom"
import Page from "./Page"

import { Firestore, Timestamp, collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";

export default function PagesOverview({firestore} : {firestore: Firestore}) {
    
    
    
    return (
        <Routes>
            <Route path="" element={<Overview firestore={firestore} />} />
            <Route path=":pageID" element={<Page firestore={firestore} />} />
        </Routes>
    )
}

function Overview({firestore} : {firestore: Firestore}) {
    const { isLoading, data, error } = useQuery("query", () => getData())

    type Page = {
        id: string,
        title: string,
        markdown: Array<string>,
        shortDesc: string,
        created: Timestamp,
        updated: Timestamp
    }

    async function getData() {
        const snapshot = await getDocs(collection(firestore, 'pages'))

        let pages: Array<Page> = []

        snapshot.forEach(async (doc) => {
            pages.push({
                ...doc.data(),
                id: doc.id
            })
        })

        return pages
    }

    function getPageEntriesComponent() {
        const pageEntries: Array<JSX.Element> = []

        function getPageDateString(release_date: {seconds: number, nanoseconds: number}) {
            var date = new Date(1970, 0, 1); // Epoch
            date.setSeconds(release_date.seconds);
            return date.toLocaleDateString('en-US');
        }

        for (const page of data) {
            pageEntries.push(
                <div className="p-2" key={page.id}>
                    <div>
                        <a href={`/pages/${page.id}`}>
                            <h3 style={{display: "inline"}}>
                                {page.title}
                            </h3>
                        </a> • 
                        <div className="ps-1" style={{display: "inline", fontStyle: 'italic', color: 'gray'}}>
                            created: {getPageDateString(page.created)}, updated {getPageDateString(page.updated)}
                        </div>
                    </div>
                    <p>{page.shortDesc}</p>
                </div>
            )
        }

        return pageEntries
    }

    if (error) {
        return (
            <>
                <h1>There was an error while loading pages. Please try again!</h1>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <div>
                    loading pages
                </div>
            </>
        )
    }

    
    return (
        <div className="p-2">
            <h1>All Pages</h1>
            {getPageEntriesComponent()}
        </div>
    )
}