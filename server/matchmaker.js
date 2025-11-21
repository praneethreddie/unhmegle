let queue = [];

const addRequest = (id, gender) => {
    // Remove existing request if any
    removeRequest(id);
    queue.push({ id, gender });
};

const removeRequest = (id) => {
    queue = queue.filter(user => user.id !== id);
};

const findMatch = (id, gender) => {
    console.log(`Searching match for ${id} (${gender}). Queue size: ${queue.length}`);
    // 1. Try to find opposite gender
    const oppositeGender = gender === 'male' ? 'female' : 'male';

    let matchIndex = queue.findIndex(user => user.gender === oppositeGender && user.id !== id);

    // 2. If no opposite gender, find anyone
    if (matchIndex === -1) {
        console.log(`No opposite gender found for ${id}. Looking for anyone.`);
        matchIndex = queue.findIndex(user => user.id !== id);
        if (matchIndex !== -1) console.log(`Fallback match found for ${id}`);
    }

    if (matchIndex !== -1) {
        const match = queue[matchIndex];
        console.log(`Match found for ${id}: ${match.id}`);
        // Remove match from queue
        queue.splice(matchIndex, 1);
        return match;
    }

    console.log(`No match found for ${id}.`);
    return null;
};

module.exports = { addRequest, removeRequest, findMatch };
