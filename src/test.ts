// interface Word {
//     word: string;
//     start: number;
//     end: number;
// }

// interface Response {
//     text: string;
//     words: Word[];
// }

// function segmentWords(response: Response): string[] {
//     const segments: string[] = [];
//     let currentSegment = '';

//     response.words.forEach((word, index) => {
//         if (currentSegment === '') {
//             currentSegment += word.word;
//         } else {
//             const prevWordEnd = response.words[index - 1].end;
//             const pause = word.start - prevWordEnd;
//             if (pause > 0.5) { // If there's a pause of more than 0.5 seconds, consider it as a new segment
//                 // Push the current segment to segments
//                 segments.push(currentSegment.trim());
//                 // Start a new segment with the current word
//                 currentSegment = word.word;
//             } else {
//                 // Append the word to the current segment
//                 currentSegment += ' ' + word.word;
//             }
//         }
//     });

//     // Push the last segment if it's not empty
//     if (currentSegment.trim() !== '') {
//         segments.push(currentSegment.trim());
//     }

//     // Compare segments with the original text and include punctuations
//     for (let i = 0; i < segments.length; i++) {
//         // Find the index of the segment in the original text
//         const index = response.text.indexOf(segments[i]);
//         if (index !== -1) {
//             // Include the punctuations from the original text
//             const punctuations = response.text.slice(index + segments[i].length, index + segments[i].length + 2).match(/[.,]/);
//             if (punctuations) {
//                 segments[i] += punctuations[0];
//             }
//         }
//     }

//     return segments;
// }


// const jsonResponse: any = {
//     "response": {
//         "text": "Dr. Martin Luther King Jr. in a 1968 speech where he reflects upon the civil rights movement states, in the end, we will remember not the words of our enemies, but the silence of our friends. As a teacher, I've internalized this message. Every day all around us, we see the consequences of silence manifest themselves in the form of discrimination, violence, genocide, and war. In the classroom, I challenge my students to explore the silences in their own lives through poetry. We work together to fill those spaces, to recognize them, to name them, to understand that they don't have to be sources of shame. In an effort to create a culture within my classroom where students feel safe sharing the intimacies of their own silences, I have four core principles posted on the board that sits in the front of my class, which every student signs at the beginning of the year. Read critically, write consciously, speak clearly, tell your truth. I find myself thinking a lot about that last point, tell your truth, and I realize that if I was going to ask my students to speak up, I was going to have to tell my truth and be honest with them about the times where I failed to do so. So I tell them that growing up as a kid in a Catholic family in New Orleans, during Lent, I was always taught that the most meaningful thing one could do was to give something up, sacrifice something you typically indulge in to prove to God you understand his sanctity. I've given up soda, McDonald's, French fries, French kisses, and everything in between. But one year I gave up speaking, figured the most valuable thing I could sacrifice was my own voice, but it was like I hadn't realized that I had given that up a long time ago. I had spent so much of my life telling people the things they wanted to hear instead of the things they needed to, told myself I wasn't meant to be anyone's conscience because I still had to figure out being my own, so sometimes I just wouldn't say anything, appeasing ignorance with my silence, unaware that validation doesn't need words to endorse its existence. When Christian was beat up for being gay, I put my hands in my pocket and walked with my head down as if I didn't even notice, couldn't use my locker for weeks because the bolt on the lock reminded me of the one I had put on my lips. When the homeless man on the corner looked at me with eyes up, merely searching for an affirmation that he was worth seeing, I was more concerned with touching the screen of my apple than actually feeding him one. When the woman at the fundraising gala said, I'm so proud of you, it must be so hard teaching those poor, unintelligent kids, I bit my lip because apparently we needed her money more than my students needed their dignity. We spend so much time listening to the things people are saying that we rarely pay attention to the things they don't. Silence is the residue of fear. It is feeling your flaws, gut-wrench guillotine your tongue. It is the air retreating from your chest because it doesn't feel safe in your lungs. Silence is Rwandan genocide. Silence is Katrina. It is what you hear when there aren't enough body bags left. It is the sound after the noose is already tied. It is charring. It is chains. It is privilege. It is pain. There is no time to pick your battles when your battles have already picked you. I will not let silence wrap itself around my indecision. I will tell Christian that he is a lion, a sanctuary of bravery and brilliance. I will ask that homeless man what his name is and how his day was, because sometimes all people want to be is human. I will tell that woman that my students can talk about transcendentalism like their last name was Thoreau, and just because you watch one episode of The Wire doesn't mean you know anything about my kids. So this year, instead of giving something up, I will live every day as if there were a microphone tucked under my tongue, a stage on the underside of my inhibition. Because who has to have a soap box when all you've ever needed is your voice? Thank you. Applause",
//         "words": [
//             {"word": "Dr", "start": 12.94, "end": 13.42},
//             {"word": "Martin", "start": 13.5, "end": 13.72},
//             {"word": "Luther", "start": 13.72, "end": 13.9},
//             {"word": "King", "start": 13.9, "end": 14.14},
//             {"word": "Jr", "start": 14.14, "end": 14.42},
//             {"word":"in","start":15.100000381469727,"end":15.319999694824219},{"word":"a","start":15.319999694824219,"end":15.819999694824219},{"word":"1968","start":15.819999694824219,"end":16.34000015258789},{"word":"speech","start":16.34000015258789,"end":16.639999389648438},{"word":"where","start":16.639999389648438,"end":16.84000015258789},{"word":"he","start":16.84000015258789,"end":17.239999771118164},{"word":"reflects","start":17.239999771118164,"end":17.360000610351562},{"word":"upon","start":17.360000610351562,"end":17.520000457763672},{"word":"the","start":17.520000457763672,"end":17.760000228881836},{"word":"civil","start":17.760000228881836,"end":17.899999618530273},{"word":"rights","start":17.899999618530273,"end":18.100000381469727},{"word":"movement","start":18.100000381469727,"end":18.940000534057617},{"word":"states","start":18.940000534057617,"end":19.219999313354492},{"word":"in","start":20.1200008392334,"end":20.260000228881836},{"word":"the","start":20.260000228881836,"end":20.420000076293945},{"word":"end","start":20.420000076293945,"end":20.65999984741211},{"word":"we","start":21.600000381469727,"end":21.719999313354492},{"word":"will","start":21.719999313354492,"end":21.959999084472656},{"word":"remember","start":21.959999084472656,"end":22.18000030517578},{"word":"not","start":22.18000030517578,"end":22.420000076293945},{"word":"the","start":22.420000076293945,"end":22.899999618530273},{"word":"words","start":22.899999618530273,"end":22.899999618530273},{"word":"of","start":22.899999618530273,"end":23.079999923706055},{"word":"our","start":23.079999923706055,"end":23.3799991607666},{"word":"enemies","start":23.3799991607666,"end":23.600000381469727},{"word":"but","start":24.719999313354492,"end":24.81999969482422},{"word":"the","start":24.81999969482422,"end":25.15999984741211},{"word":"silence","start":25.15999984741211,"end":25.34000015258789},{"word":"of","start":25.34000015258789,"end":25.559999465942383},{"word":"our","start":25.559999465942383,"end":25.760000228881836},{"word":"friends","start":25.760000228881836,"end":26.020000457763672},{"word":"As","start":26.639999389648438,"end":27.280000686645508},{"word":"a","start":27.280000686645508,"end":27.700000762939453},
//             // More words...
//         ]
//     }
// };

// const segments = segmentWords(jsonResponse.response);
// console.log(segments);






interface Word {
    word: string;
    start: number;
    end: number;
}

interface SegmentedWord {
    word: string;
    startTime: number;
    endTime: number;
}

interface Response {
    text: string;
    words: Word[];
}

export function segmentWords(response: Response): SegmentedWord[] {
    const segmentedWords: SegmentedWord[] = [];
    let currentSegment = '';

    response.words.forEach((word, index) => {
        if (currentSegment === '') {
            currentSegment += word.word;
        } else {
            const prevWordEnd = response.words[index - 1].end;
            const pause = word.start - prevWordEnd;
            if (pause > 0.5) { // If there's a pause of more than 0.5 seconds, consider it as a new segment
                // Push the current segment to segments
                segmentedWords.push({
                    word: currentSegment.trim(),
                    startTime: response.words[index - 1].start,
                    endTime: response.words[index - 1].end
                });
                // Start a new segment with the current word
                currentSegment = word.word;
            } else {
                // Append the word to the current segment
                currentSegment += ' ' + word.word;
            }
        }
    });

    // Push the last segment if it's not empty
    if (currentSegment.trim() !== '') {
        const lastIndex = response.words.length - 1;
        segmentedWords.push({
            word: currentSegment.trim(),
            startTime: response.words[lastIndex].start,
            endTime: response.words[lastIndex].end
        });
    }

    // Include punctuations
    segmentedWords.forEach((segmentedWord, index) => {
        // Find the index of the segment in the original text
        const indexInText = response.text.indexOf(segmentedWord.word);
        if (indexInText !== -1) {
            // Include the punctuations from the original text
            const punctuations = response.text.slice(indexInText + segmentedWord.word.length, indexInText + segmentedWord.word.length + 2).match(/[.,]/);
            if (punctuations) {
                segmentedWords[index].word += punctuations[0];
            }
        }
    });

    return segmentedWords;
}

const jsonResponse: any = {
    "response": {
        "text": "Dr. Martin Luther King Jr. in a 1968 speech where he reflects upon the civil rights movement states, in the end, we will remember not the words of our enemies, but the silence of our friends. As a teacher, I've internalized this message. Every day all around us, we see the consequences of silence manifest themselves in the form of discrimination, violence, genocide, and war. In the classroom, I challenge my students to explore the silences in their own lives through poetry. We work together to fill those spaces, to recognize them, to name them, to understand that they don't have to be sources of shame. In an effort to create a culture within my classroom where students feel safe sharing the intimacies of their own silences, I have four core principles posted on the board that sits in the front of my class, which every student signs at the beginning of the year. Read critically, write consciously, speak clearly, tell your truth. I find myself thinking a lot about that last point, tell your truth, and I realize that if I was going to ask my students to speak up, I was going to have to tell my truth and be honest with them about the times where I failed to do so. So I tell them that growing up as a kid in a Catholic family in New Orleans, during Lent, I was always taught that the most meaningful thing one could do was to give something up, sacrifice something you typically indulge in to prove to God you understand his sanctity. I've given up soda, McDonald's, French fries, French kisses, and everything in between. But one year I gave up speaking, figured the most valuable thing I could sacrifice was my own voice, but it was like I hadn't realized that I had given that up a long time ago. I had spent so much of my life telling people the things they wanted to hear instead of the things they needed to, told myself I wasn't meant to be anyone's conscience because I still had to figure out being my own, so sometimes I just wouldn't say anything, appeasing ignorance with my silence, unaware that validation doesn't need words to endorse its existence. When Christian was beat up for being gay, I put my hands in my pocket and walked with my head down as if I didn't even notice, couldn't use my locker for weeks because the bolt on the lock reminded me of the one I had put on my lips. When the homeless man on the corner looked at me with eyes up, merely searching for an affirmation that he was worth seeing, I was more concerned with touching the screen of my apple than actually feeding him one. When the woman at the fundraising gala said, I'm so proud of you, it must be so hard teaching those poor, unintelligent kids, I bit my lip because apparently we needed her money more than my students needed their dignity. We spend so much time listening to the things people are saying that we rarely pay attention to the things they don't. Silence is the residue of fear. It is feeling your flaws, gut-wrench guillotine your tongue. It is the air retreating from your chest because it doesn't feel safe in your lungs. Silence is Rwandan genocide. Silence is Katrina. It is what you hear when there aren't enough body bags left. It is the sound after the noose is already tied. It is charring. It is chains. It is privilege. It is pain. There is no time to pick your battles when your battles have already picked you. I will not let silence wrap itself around my indecision. I will tell Christian that he is a lion, a sanctuary of bravery and brilliance. I will ask that homeless man what his name is and how his day was, because sometimes all people want to be is human. I will tell that woman that my students can talk about transcendentalism like their last name was Thoreau, and just because you watch one episode of The Wire doesn't mean you know anything about my kids. So this year, instead of giving something up, I will live every day as if there were a microphone tucked under my tongue, a stage on the underside of my inhibition. Because who has to have a soap box when all you've ever needed is your voice? Thank you. Applause",
        "words": [
            {"word": "Dr", "start": 12.94, "end": 13.42},
            {"word": "Martin", "start": 13.5, "end": 13.72},
            {"word": "Luther", "start": 13.72, "end": 13.9},
            {"word": "King", "start": 13.9, "end": 14.14},
            {"word": "Jr", "start": 14.14, "end": 14.42},
            {"word":"in","start":15.100000381469727,"end":15.319999694824219},{"word":"a","start":15.319999694824219,"end":15.819999694824219},{"word":"1968","start":15.819999694824219,"end":16.34000015258789},{"word":"speech","start":16.34000015258789,"end":16.639999389648438},{"word":"where","start":16.639999389648438,"end":16.84000015258789},{"word":"he","start":16.84000015258789,"end":17.239999771118164},{"word":"reflects","start":17.239999771118164,"end":17.360000610351562},{"word":"upon","start":17.360000610351562,"end":17.520000457763672},{"word":"the","start":17.520000457763672,"end":17.760000228881836},{"word":"civil","start":17.760000228881836,"end":17.899999618530273},{"word":"rights","start":17.899999618530273,"end":18.100000381469727},{"word":"movement","start":18.100000381469727,"end":18.940000534057617},{"word":"states","start":18.940000534057617,"end":19.219999313354492},{"word":"in","start":20.1200008392334,"end":20.260000228881836},{"word":"the","start":20.260000228881836,"end":20.420000076293945},{"word":"end","start":20.420000076293945,"end":20.65999984741211},{"word":"we","start":21.600000381469727,"end":21.719999313354492},{"word":"will","start":21.719999313354492,"end":21.959999084472656},{"word":"remember","start":21.959999084472656,"end":22.18000030517578},{"word":"not","start":22.18000030517578,"end":22.420000076293945},{"word":"the","start":22.420000076293945,"end":22.899999618530273},{"word":"words","start":22.899999618530273,"end":22.899999618530273},{"word":"of","start":22.899999618530273,"end":23.079999923706055},{"word":"our","start":23.079999923706055,"end":23.3799991607666},{"word":"enemies","start":23.3799991607666,"end":23.600000381469727},{"word":"but","start":24.719999313354492,"end":24.81999969482422},{"word":"the","start":24.81999969482422,"end":25.15999984741211},{"word":"silence","start":25.15999984741211,"end":25.34000015258789},{"word":"of","start":25.34000015258789,"end":25.559999465942383},{"word":"our","start":25.559999465942383,"end":25.760000228881836},{"word":"friends","start":25.760000228881836,"end":26.020000457763672},{"word":"As","start":26.639999389648438,"end":27.280000686645508},{"word":"a","start":27.280000686645508,"end":27.700000762939453},
            // More words...
        ]
    }
};


const segments = segmentWords(jsonResponse.response);
console.log(segments);
