export const workshopData = [
    {
      id: '2a',
      title: 'Project 2A: Web-Design Workbook (Weeks 1–3)',
      children: [
        {
          id: '2a-research',
          title: "Research Journal (Hunt’n’Gather #1–3)",
          children: [
            {
              id: '2a-research-1',
              title: "Hunt’n’Gather #1",
              content: `
                <p><strong>Reference:</strong> Random International, <em>Rain Room</em>, 2012, Barbican Centre (London).</p>
                <p><strong>Summary:</strong> A motion-sensing installation that pauses falling water around visitors, letting them walk through rain without getting wet in a meditative, sensor-driven environment.</p>
                <figure><img src="/images/rj1.jpg" alt="Dimly lit room with a grid of rain and a solitary figure standing dry amidst the downpour"><figcaption>Image for entry #1</figcaption></figure>
              `
            },
            {
              id: '2a-research-2',
              title: "Hunt’n’Gather #2",
              content: `
                <p><strong>Reference:</strong> Daniel Rozin, <em>Wooden Mirror</em>, 1999, SIGGRAPH 2000.</p>
                <p><strong>Summary:</strong> An interactive wall of 830 wooden tiles that tilt via motors to reflect the viewer’s silhouette in real-time, blending warm craft materials with digital mirroring.</p>
                <figure><img src="/images/rj2.jpg" alt="Grid of small wooden panels tilting to form a pixelated mirror image of a person"><figcaption>Image for entry #2</figcaption></figure>
              `
            },
            {
              id: '2a-research-3',
              title: "Hunt’n’Gather #3",
              content: `
                <p><strong>Reference:</strong> Rafael Lozano-Hemmer, <em>Pulse Room</em>, 2006, 52nd Venice Biennale (Mexico Pavilion).</p>
                <p><strong>Summary:</strong> A darkened space filled with hundreds of hanging bulbs that flash to participants’ heartbeats, weaving a collective tapestry of light and human rhythm.</p>
                <figure><img src="/images/rj3.jpg" alt="Rows of suspended lightbulbs in a dark room pulsating in time with recorded heartbeats"><figcaption>Image for entry #3</figcaption></figure>
              `
            }
          ]
        },
        {
          id: '2a-workshops',
          title: 'Workshop Documentation',
          children: [
            {
              id: '2a-wk1',
              title: 'Wk 1',
              children: [
                {
                  id: '2a-wk1-1',
                  title: 'Gesture-glossary + speculative HCI sketches',
                  content: `
                    <figure>
                      <img src="workshop/img/w1_gestures.jpg" alt="Gesture glossary sketches showing pinch-based volume control and positional gestures">
                      <figcaption>Gesture glossary: volume control via pinch and position</figcaption>
                    </figure>
                  `
                },
                {
                  id: '2a-wk1-2',
                  title: 'Wireframing: Instagram desktop page',
                  content: `
                    <figure>
                      <img src="workshop/img/w1_ig.jpg" alt="Hand-drawn wireframe sketch of an Instagram desktop interface from memory">
                      <figcaption>Wireframe sketch of Instagram desktop</figcaption>
                    </figure>
                  `
                },
                {
                  id: '2a-wk1-3',
                  title: 'Wireframing: YouTube layout',
                  content: `
                    <figure>
                      <img src="workshop/img/w1_yt.jpg" alt="Hand-drawn wireframe sketch of a YouTube interface from memory">
                      <figcaption>Wireframe sketch of YouTube page</figcaption>
                    </figure>
                  `
                }
              ]
            },
            {
              id: '2a-wk2',
              title: 'Wk 2',
              children: [
                {
                  id: '2a-wk2-1',
                  title: 'Debugging session',
                  content: `
                    <figure>
                      <img src="workshop/img/w2_debugging.jpg" alt="Screenshot of Karen Ann helping debug a GitHub-hosted website">
                      <figcaption>Karen Ann debugging session on GitHub</figcaption>
                    </figure>
                  `
                },
                {
                  id: '2a-wk2-2',
                  title: 'Workbook site wireframe',
                  content: `
                    <figure>
                      <img src="workshop/img/w2_wireframe.jpg" alt="Wireframe sketch for the 2A workbook website layout">
                      <figcaption>Wireframe for 2A workbook site</figcaption>
                    </figure>
                  `
                }
              ]
            },
            {
              id: '2a-wk3',
              title: 'Wk 3',
              children: [
                {
                  id: '2a-wk3-1',
                  title: 'Function embedding via paper prototype',
                  content: `
                    <figure>
                      <img src="workshop/img/w3_functionthrowpaper.png" alt="Paper prototype illustrating JS scripts embedded within HTML document">
                      <figcaption>JS script integration in HTML</figcaption>
                    </figure>
                  `
                },
                {
                  id: '2a-wk3-2',
                  title: 'CSS styling demos',
                  content: `
                    <figure>
                      <img src="workshop/img/w3_elements.png" alt="CSS styling visual showing element selectors and properties">
                      <figcaption>CSS elements styling overview</figcaption>
                    </figure>
                    <figure>
                      <img src="workshop/img/w3_style.png" alt="CSS stylesheet snippets for responsive and decorative styling">
                      <figcaption>CSS stylesheet snippets</figcaption>
                    </figure>
                  `
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2b',
      title: 'Project 2B: Creative-Coding Workbook (Weeks 4–6)',
      children: [
        {
            id: '2b-research',
            title: "Research Journal (Hunt’n’Gather #4–6)",
            children: [
              {
                id: '2b-research-4',
                title: "Hunt’n’Gather #4",
                content: `
                  <ul>
                    <li>
                      <strong>Journey (thatgamecompany, 2012, PlayStation 3)</strong><br/>
                      <img src="https://img.pastemagazine.com/wp-content/uploads/2022/07/18002840/journey-coop.jpg"
                           alt="A lone traveler in a flowing red robe stands against an endless expanse of golden dunes under a pale sky."
                      /><img src="https://images.squarespace-cdn.com/content/v1/56eb27558a65e2c2a033b13c/1461864241714-QHPK2EW9DUQCEO631SCL/image-asset.jpeg"
                           alt="A lone traveler in a flowing red robe stands against an endless expanse of golden dunes under a pale sky."
                      />
                      <br/>
                      
                      A wordless third-person adventure set in a vast desert and ruined civilization, celebrated for its quiet, meditative atmosphere and stunning visuals – players traverse deep neutral-toned sands toward a distant mountain.<br/>
                    </li>
                    <li>
                      <strong>Inside (Playdead, 2016, Xbox One/PC)</strong><br/>
                      <img src="https://images.squarespace-cdn.com/content/v1/5f2b7d0eba5613312baef0bc/1625005443933-46ULA3JU02LUH3NMHIDU/INSIDE+-+Screenshot2-1080p.jpg"
                           alt="A small silhouette of a boy navigates a dark, misty forest with a faint red highlight on his shirt."
                      />
                      <img src="https://cdn.craft.cloud/07cfd147-dcc8-4b83-aa98-6397b0ca944b/assets/images/general/Picture1.png?width=1200&height=630&quality=82&fit=cover&s=Oj7CUkjTaQAPbAPO1vh777EI3gJHnfTs1Sd-32-ELYc"
                           alt="A small silhouette of a boy navigates a dark, misty forest with a faint red highlight on his shirt."
                      /><br/>                      


                      
                      A brooding puzzle-platformer with a minimalist 3D environment in muted greys and blacks, punctuated by occasional bold red accents, evoking an eerie, introspective mood.<br/>
                    </li>
                    <li>
                      <strong>Gris (Nomada Studio, 2018, Switch/PC)</strong><br/>
                      <img src="https://www.thisiscolossal.com/wp-content/uploads/2018/09/Gris-2.jpg"
                           alt="A faint figure of a girl stands amid soft greys, her flowing dress gaining a hint of watercolor color."
                      /><br/>
                      An artistic platformer about grief, in a watercolor-inspired world that starts monochromatic and slowly blooms with color, emphasizing healing and reflection.<br/>
                    </li>
                  </ul>
                `
              },
              {
                id: '2b-research-5',
                title: "Hunt’n’Gather #5",
                content: `
                  <ul>
                    <li>
                      <strong>Text Rain (Camille Utterback & Romy Achituv, 1999)</strong><br/>
                      Sources: <a href="https://camilleutterback.com/projects/text-rain/">camilleutterback.com</a><br/>
                      <img src="https://camilleutterback.com/wp2022/wp-content/gallery/text-rain/textrain_hands3_640_72dpi.jpg"
                           alt="Participants catch falling letters on their shadows, forming lines of a poem."
                      /><br/>
                      An interactive installation projecting falling letters that “rain” and accumulate on participants’ silhouettes, merging gesture and generative text in a poetic body-language interplay.<br/>
                    </li>
                    <li>
                      <strong>The Treachery of Sanctuary (Chris Milk, 2012)</strong><br/>
                      Sources: <a href="https://milk.co/treachery">milk.co</a><br/>
                      <img src="https://mindychou2017.wordpress.com/wp-content/uploads/2018/10/treachery1-1.jpg"
                           alt="A visitor’s silhouette dissolves into birds against a three-panel backlit display."
                      />
                      <img src="https://andrewcarr102.wordpress.com/wp-content/uploads/2015/12/untitled-1_860_906.jpg?w=1040"
                           alt="A visitor’s silhouette dissolves into birds against a three-panel backlit display."
                      /><br/>
                      A three-panel interactive triptych where one’s shadow disintegrates into birds, is attacked by them, then emerges with majestic wings in a spiritual mirror of transformation.<br/>
                    </li>
                  </ul>
                `
              },
              {
                id: '2b-research-6',
                title: "Hunt’n’Gather #6",
                content: `
                  <ul>
                    <li>
                      <strong>Hyphae Lamp (Nervous System, 2011)</strong><br/>
                      Sources: <a href="https://www.designboom.com/design/nervous-system-hyphae-lamp/">designboom.com</a><br/>
                      <img src="https://cdn.designboom.com/images/2011/01/Hyphae-lamp-thumbnail.jpg"
                           alt="A bone-white branching 3D-printed lamp casting lace-like shadows."
                      /><br/>
                      An algorithmically grown lamp inspired by leaf veins, 3D-printed in white nylon to cast delicate, organic shadows via its veined lattice structure.<br/>
                    </li>
                    <li>
                      <strong>Skulptuur (Piter Pasma, 2021)</strong><br/>
                      Sources: <a href="https://piterpasma.nl/skulptuur">piterpasma.nl</a><br/>
                      <img src="https://piterpasma.nl/skulptuur/thumbnail.jpg"
                           alt="A multicolored code snippet representing an algorithmically generated digital sculpture."
                      /><br/>
                      A series of 1000 digital sculptures carved from minimal code (6 370 bytes), each revealed through complex 3D forms illuminated by virtual lighting.<br/>
                    </li>
                    <li>
                      <strong>Panoramical (Fernando Ramallo & David Kanaga, 2015)</strong><br/>
                      Sources: <a href="https://audioz.download/software/win/102689-download_panoramical-winx64.html">AudioZ</a><br/>
                      <img src="https://audioz.download/images/panoramical-thumbnail.jpg"
                           alt="A pastel-tinted 3D landscape warped by slider controls in a serene sandbox environment."
                      /><br/>
                      A surreal audiovisual “game” where sliders morph abstract 3D landscapes in real time, blending generative art and music in an introspective sandbox.<br/>
                    </li>
                  </ul>
                `
              }
            ]
        },
        {
          id: '2b-workshops',
          title: 'Workshop Documentation',
          children: [
            {
              id: '2b-wk4',
              title: 'Wk 4',
              children: [
                { id: '2b-wk4-1', title: '“Throw of the Dice” paper exercise (photos + rules summary)', content: '' },
                { id: '2b-wk4-2', title: 'p5.js basic sketch (Processing-p5 mode): screenshots + key code', content: '' }
              ]
            },
            {
              id: '2b-wk5',
              title: 'Wk 5',
              children: [
                { id: '2b-wk5-1', title: 'User-input brainstorm (sketches + concept notes)', content: '' },
                { id: '2b-wk5-2', title: 'p5.js image & sound demo: code + short video or GIF', content: '' }
              ]
            },
            {
              id: '2b-wk6',
              title: 'Wk 6',
              children: [
                { id: '2b-wk6-1', title: 'p5.js sound I/O (microphone in, Tone player): code + screenshots', content: '' },
                { id: '2b-wk6-2', title: 'WEBGL intro (simple model + texture demo): code snippets + images', content: '' },
                { id: '2b-wk6-3', title: 'Consultation embed: refined original sketch', content: '' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2c',
      title: 'Project 2C: Physical-Computing Workbook (Weeks 7–9)',
      children: [
        {
          id: '2c-research',
          title: "Research Journal (Hunt’n’Gather #7–9)",
          children: [
            {
              id: '2c-research-7',
              title: "Hunt’n’Gather #7",
              content: `
    <ul>
      <li>
        <strong>DesignNOW: Ryoji Ikeda (Taipei Fine Arts Museum, 10.08.2019)</strong><br/>
        Taipei’s leading arts institution unveils Japanese artist Ryoji Ikeda’s immersive data- and information-driven audiovisual installations, sound sculptures, and abstract test patterns—exploring mathematics, quantum theory, and the physical phenomena of sound, light, space, and time.<br/>
        <em>Core concept:</em> Questioning “What is sound?” through vibration, frequency, and white noise to challenge human perception.<br/>
        <img src="workshop/img/c_ryoji1.png" alt="The Planck Universe [macro], 2015"/>
      </li>
      <li>
        <strong>Enigmatriz</strong><br/>
        <a href="https://enigmatriz.com/">enigmatriz.com</a><br/>
        Graphic designer and digital artist from Argentina. Utilises ASCII motifs and mixed media to create visuals.<br/>
        <img src="workshop/img/c_enigmatriz1.png" alt="Enigmatriz ASCII art example 1"/><br/>
        <img src="workshop/img/c_enigmatriz2.png" alt="Enigmatriz ASCII art example 2"/>
      </li>
    </ul>
    `        },
            {
              id: '2c-research-8',
              title: "Hunt’n’Gather #8",
              content: `
    <ul>
      <li>
        <strong>Lyo Taniguchi (Instagram project, 2025)</strong><br/>
        <a href="https://www.instagram.com/lyo_taniguchi/">@lyo_taniguchi</a><br/>
        An experimental artist creating audio-visual works in TouchDesigner. Utilising motion-tracking, data-moshing, point-clouds, object recognition and 3d.<br/>
        <img src="workshop/img/c_lyo1.png" alt="Lyo Taniguchi sensor-textile sculpture"/><br/>
        <img src="workshop/gif/c_lyo1.gif" alt="Interactive demo of Lyo Taniguchi's textile reactive lighting"/>
      </li>
    </ul>
    `        },
            {
              id: '2c-research-9',
              title: "Hunt’n’Gather #9",
              content: `
    <ul>
      <li>
        <strong>Dead Drops (Aram Bartholl, 2010)</strong><br/>
        <a href="https://deaddrops.com/">deaddrops.com</a><br/>
        An offline peer‑to‑peer file‑sharing network created by embedding USB drives into public urban surfaces—users plug laptops directly into walls to exchange data, emphasizing physical engagement with digital content.
        <img src="https://deaddrops.com/wp-content/uploads/2010/11/deaddrops1.jpg" alt="Dead Drops USB drive embedded in a wall"/><br/>
      </li>
    </ul>
    `        }
          ]
        },
        {
          id: '2c-workshops',
          title: 'Workshop Documentation',
          children: [
            {
              id: '2c-wk7',
              title: 'Wk 7',
              content: `
                Prototyped sensor–actuator combos in “What’s in the Box?” and documented each step with photos. 
                Built Tinkercad circuits and live-coded Arduino sketches. Documented the process with screenshots and video clips.
              `,
              children: [
                {
                  id: '2c-wk7-1',
                  title: '“What’s in the Box?” sensor/actuator exploration (photos + notes)',
                  content: `
                    <ul>
                      <li>
                        <img src="workshop/img/c_labels.jpg" alt="Photo showing labeled components used in the sensor/actuator exploration"/>
                        <img src="workshop/img/contents.jpg" alt="Overview shot of all workshop materials and tools"/>
                      </li>
                      <li>
                        <img src="workshop/img/c_arduinokit.jpg" alt="Close-up of the Arduino kit components"/>
                      </li>
                      <li>
                        <img src="workshop/img/c_cables.jpg" alt="Various jumper cables and USB leads arranged for prototyping"/>
                      </li>
                    </ul>
                  `
                },
                {
                  id: '2c-wk7-3',
                  title: 'Button-Activated LED',
                  content: `
                    <img src="workshop/gif/c_ledbutton.gif" alt="Button-Activated LED lighting up when button pressed"/>
                    <br/>Pressing the button completes the circuit and lights the LED.
                  `
                },
                {
                  id: '2c-wk7-4',
                  title: 'Button-Activated Motor/Fan',
                  content: `
                    <img src="workshop/gif/c_fan.gif" alt="Button-Activated Motor/Fan spinning when button pressed"/>
                    <br/>Pressing the button powers the motor, spinning the fan.
                  `
                },
                {
                  id: '2c-wk7-5',
                  title: 'Sensor-Based Buzzer',
                  content: `
                    <img src="workshop/gif/c_uvbuzzer.gif" alt="Sensor-Based Buzzer sounding when UV sensor triggered"/>
                    <br/><img src="workshop/img/c_ultrasonicbuzzer.png" alt="Diagram of the ultrasonic buzzer circuit"/>
                    <br/>When the ultrasonic sensor detects light, it triggers the buzzer to sound.
                  `
                },
                {
                  id: '2c-wk7-6',
                  title: 'Sensor-Based Buzzer Variation',
                  content: `
                    <img src="workshop/gif/c_uvbuzzer2.gif" alt="Variation of UV Buzzer modulating tone and rhythm"/>
                    <br/>Difference in distance modulate the buzzer’s tone and rhythm.
                  `
                },
                {
                  id: '2c-wk7-7',
                  title: 'Sensor-Based Motor/Fan',
                  content: `
                    <img src="workshop/gif/c_uvfan.gif" alt="UV Fan motor speed increasing with UV levels"/>
                    <br/>The ultrasonic sensor drives the fan motor; was meant to increase in spin speed based on distance but didn't quite work.
                  `
                }
              ]
            },                    
            {
              id: '2c-wk8',
              title: 'Wk 8',
              children: [
                {
                  id: '2c-wk8-3',
                  title: 'Theremin Prototype',
                  content: `
                    <p>Built a touchless Theremin simulation: hand proximity alters pitch and volume.</p>
                    <img src="workshop/gif/c_theremin.gif" alt="Theremin prototype in action"/>
                    <br/>
                    <img src="workshop/img/c_theremincode.png" alt="Arduino code for Theremin"/>
                  `
                },
                {
                  id: '2c-wk8-4',
                  title: 'Capacitive Touch Sensor',
                  content: `
                    <p>Created a capacitive touch sensor using a vegetable pad: touch triggers digital signals.</p>
                    <img src="workshop/gif/c_veggie.gif" alt="Capacitive touch sensor with a vegetable pad"/>
                    <br/>
                    <img src="workshop/img/c_capacitivetinkercad.png" alt="Tinkercad schematic for capacitive touch sensor"/>
                    <br/>
                    <img src="workshop/img/c_capacitivecode.png" alt="Arduino code for capacitive touch sensor"/>
                  `
                }
              ]
            },
            {
              id: '2c-wk9',
              title: 'Wk 9',
              children: [
                {
                  id: '2c-wk9-1',
                  title: 'P5.js ↔ Arduino Integration',
                  content: `
                    <p>Connected a p5.js sketch to Arduino via Web Serial: potentiometer data drives canvas visuals and live video capture.</p>
                    <pre><code>
            /* P5.js sketch reading serial data from Arduino */
            let msg;
            let serialOptions = { baudRate: 9600 };
            let serial;
            let isConnected = false;
            let dataIn = 0;
            let textY = 40;
            let capture;
            
            function setup() {
              createCanvas(windowWidth, windowHeight);
              background(100);
              textFont('Courier New');
              textSize(20);
            
              capture = createCapture(VIDEO);
            
              serial = new Serial();
              serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
              serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
              serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
              serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);
              msg = "Not connected";
            }
            
            function draw() {
              let mappedData = map(dataIn, 0, 255, 0, height);
              background(dataIn);
              fill(0, 255, 0);
              circle(mouseX, mouseY, mappedData);
              text(msg, 40, textY);
              let mx = dataIn * 2;
              let my = dataIn * 2;
              image(capture, mouseX - mx/2, mouseY - my/2, mx, my);
            }
            
            function mouseMoved() {
              let mapedX = floor(map(mouseX, 0, width, 0, 255));
              let mapedY = floor(map(mouseY, 0, height, 0, 255));
              serialWriteArrayData([mapedX, mapedY]);
            }
            
            function mouseClicked() {
              if (!isConnected) connectPort();
            }
            
            async function connectPort() {
              if (!serial.isOpen()) {
                await serial.connectAndOpen(null, serialOptions);
              }
            }
            
            function onSerialDataReceived(eventSender, newData) {
              msg = "Received: " + newData;
              dataIn = int(newData);
            }
            </code></pre>
                    <img src="workshop/gif/c_p5ard.gif" alt="p5.js and Arduino integration demo"/>
                    <br/>
                    <img src="workshop/img/c_p5ardcode.png" alt="p5.js sketch code for Arduino integration"/>
                  `
                },
                {
                  id: '2c-wk9-2',
                  title: 'Image Manipulation',
                  content: `
                    <p>Demonstrated live image manipulation in p5.js driven by serial data inputs from Arduino.</p>
                    <img src="workshop/gif/c_p5ardimg.gif" alt="Image manipulation demo capturing live video feed manipulated by serial input"/>
                  `
                }
              ]
            }            
          ]
        }
      ]
    }
  ];
  