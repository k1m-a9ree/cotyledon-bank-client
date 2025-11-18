import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import useToastStore from "../../stores/useToastStore";
import useChildStore from "../../stores/useChildStore";
axios.defaults.withCredentials = true;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const quiz = {
    1: {
        problem: [
            '자유예금 통장은 내 지갑처럼 언제든지 돈을 넣고 뺄 수 있다?',
            '자유예금은 돈을 맘대로 쓸 수 있는 대신, 이자(보너스 돈)를 아주 많이 준다?',
            '은행에 내 돈을 안전하게 맡겨두는 것을 \'대출\'이라고 한다?'
        ],
        answer: [
            true,
            false,
            false
        ],
        explain: [
            '맞아요. 자유예금은 입금과 출금이 자유로워서 용돈이나 생활비를 관리하기 편해요',
            '아니에요. 언제든 돈을 빼갈 수 있어서 은행은 이자를 아주 조금만 줘요',
            '아니에요. 돈을 맡기는 건 \'예금\', 은행에서 돈을 빌리는 게 \'대출\'이에요'
        ]
    },
    2: {
        problem: [
            '자유적금은 매달 정해진 날짜에 딱 정해진 금액만 저축해야 한다?',
            '이번 달에 세뱃돈을 많이 받았다면, 자유적금 통장에 평소보다 돈을 더 많이 넣어도 된다?',
            '적금은 작은 돈을 차곡차곡 모아서 나중에 큰 목돈을 만들기 위해 하는 것이다?'
        ],
        answer: [
            false,
            true,
            true
        ],
        explain: [
            '아니에요. 자유적금은 날짜도, 금액도 내 마음대로 자유롭게 정할 수 있어요.',
            '맞아요. 돈이 생길 때마다 한도 내에서 얼마든지 더 많이 저축해도 괜찮아요.',
            '맞아요. \'티끌 모아 태산\'처럼 조금씩 모아 큰돈을 만드는 게 목표예요.'
        ]
    },
    3: {
        problem: [
            '정기예금은 큰돈을 한꺼번에 맡기고 "1년 동안 안 찾을게요" 하고 약속하는 것이다?',
            '정기예금은 가입하고 하루 만에 취소해도 약속한 이자를 다 받을 수 있다?',
            '정기예금은 매일매일 100원씩 저축하고 싶은 사람에게 가장 좋은 방법이다?'
        ],
        answer: [
            true,
            false,
            false
        ],
        explain: [
            '맞아요. 목돈을 일정 기간 금고에 넣어두고 푹 묵혀두는 상품이에요',
            '아니에요. 약속한 기간을 채우지 못하면 벌칙으로 이자를 아주 조금밖에 못 받아요.',
            '아니에요. 매일 돈을 넣는 건 \'적금\'이에요. 정기예금은 이미 있는 큰돈을 보관할 때 좋아요.'
        ]
    },
    4: {
        problem: [
            '정기적금은 학교에 가는 것처럼 정해진 날짜에 꼬박꼬박 돈을 넣어야 한다?',
            '정기적금은 돈이 없으면 며칠 미뤘다가 저축해도 아무 상관 없다?',
            '매달 용돈을 일정하게 받는 친구라면, 자유적금보다 정기적금이 돈 모으기 더 좋다?'
        ],
        answer: [
            true,
            false,
            true
        ],
        explain: [
            '맞아요. 정해진 날에 잊지 않고 저축하는 규칙적인 습관이 중요해요.',
            '아니에요. 정기적금은 은행과의 약속이라서 날짜를 어기면 만기일(돈 받는 날)이 늦어질 수 있어요.',
            '맞아요. 규칙적으로 돈이 들어온다면, 강제로 저축하게 해주는 정기적금이 돈을 모으는 데 더 효과적이에요.'
        ]
    },
    5: {
        problem: [
            '주식은 그 회사의 주인이 될 수 있는 권리가 적힌 종이(증서)다?',
            '\'성장주\'는 키가 크듯이 회사의 이익이 매년 쑥쑥 늘어나는 회사를 말한다?',
            '성장주인 회사는 번 돈을 사장님이 다 가져가서 펑펑 쓴다?'
        ],
        answer: [
            true,
            true,
            false
        ],
        explain: [
            '맞아요. 주식을 사면 그 회사의 주인이 되어 이익을 나눠 가질 수 있어요',
            '맞아요. 앞으로 돈을 훨씬 더 많이 벌 것 같은 회사를 성장주라고 해요.',
            '아니에요. 회사가 더 크게 성장하기 위해 연구를 하거나 공장을 짓는 데 돈을 다시 투자해요.'
        ]
    },
    6: {
        problem: [
            '\'기대주\'는 사람들이 "와! 나중에 이 회사는 정말 대박 날 거야!" 하고 기대하는 회사다?',
            '하늘을 나는 자동차나 로봇을 만드는 회사처럼 미래 기술을 가진 회사가 기대주가 될 수 있다?',
            '기대주는 무조건 성공하니까 아무 걱정 없이 돈을 다 투자해도 된다?'
        ],
        answer: [
            true,
            true,
            false
        ],
        explain: [
            '맞아요. 지금보다 미래에 엄청나게 성공할 거라고 사람들이 믿는 회사예요.',
            '맞아요. 지금은 없지만 미래에 꼭 필요한 기술을 개발하는 회사는 기대주가 될 가능성이 높아요.',
            '아니에요. 기대만큼 성공하지 못하면 주식 가격이 떨어져서 돈을 잃을 수도 있으니 조심해야 해요.'
        ]
    }
}

function ChildQuiz() {
    const stageNum = useParams().stage;
    const [step, setStep] = useState(-1);

    return (
        step == -1 ? (
            <QuizStart setStep={setStep} />
        ) : 0 <= step && step <= 2 ? (
            <Quiz stageNum={stageNum} step={step} setStep={setStep} />
        ) : (
            <Pass stageNum={stageNum}/>
        )
    )
}

function QuizStart({ setStep }) {
    return (
        <div className="h-full flex flex-row justify-center items-center">
            <button onClick={(e) => setStep(0)} className="btn btn-xl text-4xl btn-primary">퀴즈 풀기</button>
        </div>
    )
}

function Quiz({ stageNum, step, setStep }) {
    const [isSolve, setIsSolve] = useState(false);
    const [answer, setAnswer] = useState(null);

    const navigate = useNavigate();

    const submitAnswer = (bool) => {
        setAnswer(bool);
        setIsSolve(true);
    }

    return (
        !isSolve ? (
            <div className="h-full flex flex-col justify-center items-center gap-30 p-5">
                <h1 className="text-4xl border border-7 rounded-xl p-5">{step + 1}. {quiz[stageNum].problem[step]}</h1>
                <div className="flex flex-row justify-center items-center gap-20">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => submitAnswer(true)} viewBox="0 0 24 24" className="size-40 fill-info"><path d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => submitAnswer(false)} viewBox="0 0 24 24" className="size-40 fill-error"><path d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path></svg>
                </div>
            </div>
        ) : answer === quiz[stageNum].answer[step] ? (
            // 정답일때
            <div className="h-full flex flex-col justify-center items-center gap-10 p-5">
                <h1 className="text-4xl border border-7 rounded-xl p-5">{step + 1}. {quiz[stageNum].problem[step]}</h1>
                {quiz[stageNum].answer[step] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => submitAnswer(true)} viewBox="0 0 24 24" className="size-40 fill-info"><path d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => submitAnswer(false)} viewBox="0 0 24 24" className="size-40 fill-error"><path d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path></svg>
                )}
                <p className="text-3xl">{quiz[stageNum].explain[step]}</p>
                <button className="btn btn-success btn-xl" onClick={(e) => { setIsSolve(false); setStep(s => s+1); }}>
                    정답! 다음으로 넘어가기
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-10 fill-current"><path d="M8.46,8.29A1,1,0,1,0,7,9.71L9.34,12,7,14.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3a1,1,0,0,0,0-1.42Zm8.5,3-3-3a1,1,0,0,0-1.42,1.42L14.84,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,17,11.29Z"></path></svg>
                </button>
            </div>
        ) : (
            // 오답일때
            <div className="h-full flex flex-col justify-center items-center gap-10 p-5">
                <h1 className="text-4xl border border-7 rounded-xl p-5">{step + 1}. {quiz[stageNum].problem[step]}</h1>
                {quiz[stageNum].answer[step] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => submitAnswer(true)} viewBox="0 0 24 24" className="size-40 fill-info"><path d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => submitAnswer(false)} viewBox="0 0 24 24" className="size-40 fill-error"><path d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path></svg>
                )}
                <p className="text-3xl">{quiz[stageNum].explain[step]}</p>
                <button className="btn btn-warning btn-xl" onClick={(e) => navigate('/child/stage')}>
                    오답.. 스테이지로 돌아가기
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-10 fill-current"><path d="M19.87,8.6A1,1,0,0,0,19,8H14.42l1.27-4.74a1,1,0,0,0-.17-.87A1,1,0,0,0,14.73,2h-7a1,1,0,0,0-1,.74l-2.68,10a1,1,0,0,0,.17.87,1,1,0,0,0,.8.39H8.89L7.08,20.74a1,1,0,0,0,1.71.93l10.9-12A1,1,0,0,0,19.87,8.6Zm-9.79,8.68,1.07-4a1,1,0,0,0-.17-.87,1,1,0,0,0-.79-.39H6.35L8.49,4h4.93L12.15,8.74a1,1,0,0,0,1,1.26h3.57Z"></path></svg>
                </button>
            </div>
        )
    )
}

function Pass ({ stageNum }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const showToast = useToastStore(state => state.showToast);
    const checkStage = useChildStore(state => state.checkStage);
    useEffect(() => {
        const passStage = async () => {
            try {
                setLoading(true);
                await axios.patch(`${SERVER_URL}/api/child/stage/${stageNum}`);
                await checkStage();
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                showToast(err.response.data.error.message, 'error');
            } finally {
                setLoading(false);
            }
        }
        passStage();
    }, [])
    return <div className="h-full flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl">스테이지를 통과하셨습니다! 버튼 로딩 후 눌러서 집으로 가세요</h1>
        <button onClick={(e) => { showToast(`스테이지 ${stageNum} 클리어!`); navigate('/child/stage');}} className={`btn btn-neutral btn-xl w-50 ${ loading ? 'btn-disabled' : ''}`}>{ loading ? (<span className="loading loading-infinity loading-md"></span>) : '집 가기'}</button>
    </div>
}



export default ChildQuiz;