// https://adventofcode.com/2024/day/9

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let memory: number[] = [];
    const vals: number[] = lines[0].split('').map(s=>parseInt(s));
    const numFiles = Math.ceil(vals.length/2);
    let fileId = 0;
    let reverseFileId = numFiles - 1;
    let isFile = true;
    let valIter = 0;
    let fileSize = vals[valIter++];
    let reverseFileSize = vals[reverseFileId*2];
    let run = true;
    let blankSize = 0;
    while(run) {
        if(isFile) {
            fileSize--;
            memory.push(fileId);
            if(fileSize <= 0) {
                isFile = false;
                blankSize = vals[valIter++];
                fileId++;
                if(fileId >= numFiles) {
                    run = false;
                }
            }
        } else {
            // Is blank:
            if(blankSize <= 0) {
                isFile = true;
                fileSize = vals[valIter++];
            } else {
                memory.push(-1);
                blankSize--;
            }
        }
    }

    // Then, move everything that you can:
    reverseFileId = numFiles;
    valIter = 0;
    fileSize = vals[valIter++];
    while(reverseFileId-- > 0) {
        const reverseFileIndex = memory.indexOf(reverseFileId);
        reverseFileSize = vals[reverseFileId*2];        
        // Find the first available gap that would work for this memory.
        const slotStartIndex: number = findBigSlot(memory, reverseFileSize, reverseFileIndex);
        if(slotStartIndex >= 0) {
            memory.splice(slotStartIndex, reverseFileSize, ...memory.slice(reverseFileIndex, reverseFileIndex + reverseFileSize)); // Copy the memory to the new spot
            memory.splice(reverseFileIndex, reverseFileSize, ...Array.from(Array(reverseFileSize)).map(() => -1)); // Copy blank memory to the old spot.
        } // else, move on.
    }
    return memory.reduce((checksum, val, i) => checksum + (((val === -1) ? 0 : val) * i), 0); // Calculate checksum
}

function findBigSlot(memory: number[], fileSize: number, endIndex: number): number {
    for(let i = 0; i < endIndex; i++) {
        if(memory[i] === -1 && memory.slice(i, i + fileSize).every((n: number) => n === -1)) {
                return i;
        }
    }
    return -1;
}
// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let fixed: number[] = [];
//     const vals: number[] = lines[0].split('').map(s=>parseInt(s));
//     const numFiles = Math.ceil(vals.length/2);
//     const numSpace = Math.floor(vals.length/2);
//     p(numFiles, numSpace);
//     let fileId = 0;
//     let reverseFileId = numFiles - 1;
//     let isFile = true;
//     let valIter = 0;
//     let itemSize = vals[valIter++];
//     let reverseFileSize = vals[reverseFileId*2];
//     p(`Reverse file size: ${reverseFileSize}, id: ${reverseFileId}`);
//     p(vals);
//     p();
//     let checksum = 0;
//     let checksumIndex = 0;
//     let run = true;
//     let loopCount = 0;
//     while(run) {
        
//         if(isFile) {
//             p(`${fileId} has size ${itemSize}`);
//             itemSize--;
//             fixed.push(fileId);
//             if(itemSize <= 0) {
//                 isFile = false;
//                 itemSize = vals[valIter++];
//                 p(`Finished block ${fileId}, blank space of size ${itemSize}`);
//                 fileId++;
//                 if(fileId >= reverseFileId) {
//                     run = false;
//                 }
//             }
//         } else {
//             // Is empty:
//             if(itemSize <= 0) {
//                 isFile = true;
//                 itemSize = vals[valIter++];
//                 p('New size file', itemSize);
//                 if(itemSize <= 0) {
//                     p('ITEM SIZE IS ZERO! WHAT DO WE DO?')
//                     p(valIter-1, isFile);
//                     break;
//                 }
//                 p('Switching back to the real block')
//                 // p(fixed);
//             } else {
//                 itemSize--;
//                 p(`Reverse file size: ${reverseFileSize}, id: ${reverseFileId}`);
//                 // Push one block of the last file ID
//                 fixed.push(reverseFileId);
//                 reverseFileSize--;
//                 if(reverseFileSize <= 0) {
//                     reverseFileId--;
//                     if(reverseFileId !== fileId) {
//                         reverseFileSize = vals[reverseFileId*2];
//                     }
//                     p(`New reverse file: ${reverseFileId}, size: ${reverseFileSize}`);
//                 }
//             }
//         }
//         if(fixed[0] === -1) {
//             p('fail');
//             break;
//         }
//         p(String(fixed));
//         if(loopCount++ >= 10 && fixed.length > 0){
//             checksum += fixed.shift() * checksumIndex++;
//         }
//         // if(valIter > 60) {
//         //     break;
//         // }
//     }
//     // AFTER LOOP ===================================
    
//     p('remaining file', reverseFileSize);
//     p(String(fixed));
//     for(let i = 0; i < reverseFileSize; i++) {
//         p('pushing!');
//         fixed.push(reverseFileId);
//         p(String(fixed));
//     }

//     while(fixed.length > 0) {
//         checksum += fixed.shift() * checksumIndex++;
//         p(String(fixed));
//     }
//     p(String(fixed.length), checksumIndex);
//     return checksum;
// }
