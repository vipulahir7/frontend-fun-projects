function generateOptimized(turn,arr){
    if(turn===10){
        return 0;
    }

    if(turn&1){ //user turn
        let bestScore=Infinity;

        for(let idx=1;idx<=9;idx++){
            if(arr[idx]===-1){
                arr[idx]=1;

                if(checkWinner(arr)){
                    arr[idx]=-1;
                    return -1;
                }

                let score=generateOptimized(turn+1,arr);
                arr[idx]=-1;
                bestScore=Math.min(score,bestScore);
            }
        }
        return bestScore;
    }
    else{ //computer turn
        let bestScore=-Infinity;

        for(let idx=1;idx<=9;idx++){
            if(arr[idx]===-1){
                arr[idx]=0;

                if(checkWinner(arr)){
                    arr[idx]=-1;
                    return 1;
                }

                let score=generateOptimized(turn+1,arr);
                arr[idx]=-1;
                bestScore=Math.max(bestScore,score);
            }
        }
        return bestScore;
    }
}

function findBest(turn,arr){
    let bestScore=-Infinity;
    let maxIdx=-1;

        for(let idx=1;idx<=9;idx++){
            if(arr[idx]===-1){
                arr[idx]=0;

                if(checkWinner(arr)){
                    arr[idx]=-1;
                    return idx;
                }

                let score=generateOptimized(turn+1,arr);
                arr[idx]=-1;
                if(score>bestScore){
                    bestScore=score;
                    maxIdx=idx
                }
            }
        }
        return maxIdx;
}

function generateRandom(arr){
    let arrOfHollowBoxes=[];
    for(let idx=1;idx<=9;idx++){
        if(arr[idx]===-1){
            arrOfHollowBoxes.push(idx);
        }
    }   
    
    let totalHollowBoxes=arrOfHollowBoxes.length;
    let randomPosition=Math.floor(Math.random()*totalHollowBoxes);
    return arrOfHollowBoxes[randomPosition];
}