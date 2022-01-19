export const TagNames = {
    "stamina": "Stamina",
    "allaround": "All Around",
    "footspeed": "Footspeed",
    "technical": "Technical",
    "doubles": "Doubles",
    "mods": "Mods",
    "memes": "Memes"
}

const TagColours = {
    "stamina": "#EE0064",
    "allaround": "#06E57A",
    "footspeed": "#C400E4",
    "technical": "#0094FF",
    "doubles": "#FF9900",
    "tournament": "#03B78C",
    "mods": "#03B78C",
    "memes": "#E40089",
    "fallback": "#B1B1B1"
}

/**
 * 
 * @param {string} tag Raw "tag" string from pack object.
 * @returns {Object} An object containing the tag's name and colour code.
 */
const getTagAttributes = (tag) => {
    console.log(tag);
    const tagName = TagNames[tag] ?? tag;
    const tagColour = TagColours[tag] ?? TagColours['fallback'];

    return {
        "name": tagName,
        "colour": tagColour
    }
}

export default getTagAttributes;