import { Container, Row, Col, Image } from 'react-bootstrap'

export default function About() {

    return (
        <>
            <div className="p-2">
                <div id='content-header'>
                    <h1>About Me</h1>
                </div>

                <Container className='pt-4'>
                    <Row>
                        <Col style={{backgroundColor: ''}}>
                            <Image fluid rounded style={{maxWidth: ''}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/quoteunquoteheadshotresized.jpg' />
                            <div className='pt-3' style={{lineHeight: '10px'}}>
                                <h5>Cole Patterson</h5>
                                <h6>IT Consultant</h6>
                                <p>Saint Paul, MN</p>

                                <div className='d-flex justify-content-envenly py-2'>
                                    <a href="https://www.linkedin.com/in/colepatterson4342/" target='_blank'>LinkedIn</a>
                                    <div className='px-2'>•</div>
                                    <a href="https://github.com/colepatters" target='_blank'>GitHub</a>
                                </div>
                            </div>
                        </Col>

                        <Col xs={6} style={{backgroundColor: ''}}>
                            <h3>My Life Story (REAL!!!)</h3>
                            <p>Here is a story all about how...</p>

                            <h3>Why I Code</h3>
                            <p>cuz its fun :p</p>

                            <h3>Hobbies</h3>
                            <p>doin' your mom!!!</p>
                        </Col>

                        <Col style={{backgroundColor: ''}}>
                            <h4>My Stack</h4>
                            <div className='d-flex justify-content-evenly flex-wrap pb-4'>
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/tslogo.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/googlecloudlogo2.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/firebaselogo2.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/reactlogo.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/mysqllogo.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/vitelogo.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1280px-Bootstrap_logo.svg.png' />
                            </div>

                            <h4>My Toolset</h4>
                            <div className='d-flex justify-content-evenly flex-wrap'>
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/vscodelogo.png' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/postman.svg' />
                                <Image className='p-1' rounded style={{maxWidth: '80px'}} src='https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/phpmyadminlogo.png' />

                            </div>

                        </Col>


                    </Row>
                </Container>
            </div>
        </>
    )
}