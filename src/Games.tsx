import { Firestore, collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import { Card, Button } from "react-bootstrap"

type GameEntry = {
    title: string,
    desc: string,
    thumbnail_url: string,
    url: string,
    release_date: {seconds: number, nanoseconds: number},
    playable: boolean
}

export default function Games({firestore} : {firestore: Firestore}) {
    const { isLoading, data, error } = useQuery("query", () => getData())

    async function getData() {
        const snapshot = await getDocs(collection(firestore, 'games'))

        let games: Array<GameEntry> = []
        snapshot.forEach(async (doc) => {
            games.push(doc.data() as GameEntry)
        })
        
        function sortFn(a: GameEntry, b: GameEntry) {
            if (a.release_date < b.release_date) return 1
            else return -1
        }
        games = games.sort(sortFn)

        return games
    }

    function gameDateString(release_date: {seconds: number, nanoseconds: number}) {
        var date = new Date(1970, 0, 1); // Epoch
        date.setSeconds(release_date.seconds);
        return date.toLocaleDateString('en-US');
    }

    function getGameCard(gameEntry: GameEntry) {
        return (
            <div className="p-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={gameEntry.thumbnail_url} />
                    <Card.Body>
                        <Card.Title>
                            {gameEntry.title}
                            <div style={{fontStyle: 'italic', fontWeight: 'normal', fontSize: 16}}>
                                {gameDateString(gameEntry.release_date)}
                            </div>
                        </Card.Title>
                        <Card.Text>{gameEntry.desc}</Card.Text>
                        {gameEntry.playable? 
                        <Button href={gameEntry.url} target='_blank'>Play</Button>
                        :
                        <Button disabled variant="disabled">No Release</Button>}
                    </Card.Body>
                </Card>
            </div>
        )
    }

    function getAllGameCards() {
        let cards: Array<JSX.Element> = []

        if (!data) {
            return (
                <div>
                    no data
                </div>
            )
        }

        for (const currentEntry of data) {
            cards.push(getGameCard(currentEntry))
        }

        return cards
    }


    if (isLoading) {
        return (
            <div>
                loading
            </div>
        )
    } 
    
    if (error) {
        return (
            <div>
                an unknown error occured. please try again!
            </div>
        )
    }

    return (
        <>
            <div className="d-flex align-content-stretch flex-wrap align-items-center justify-content-center">
                {getAllGameCards()}
            </div>
        </>
    )

}