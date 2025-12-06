import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useChildStore from "../../stores/useChildStore";
import useToastStore from "../../stores/useToastStore";
import axios from "axios";
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildStage() {
    const [config, setConfig] = useState({ enum: [] });

    const childStage = useChildStore(state => state.stage);
    const checkStage = useChildStore(state => state.checkStage);

    const showToast = useToastStore(state => state.showToast);

    useEffect(() => {
        const initialSet = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/financialProduct/config`);
                setConfig(() => ({ ...res.data.configs }));

                await checkStage();

                return true;
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                return false;
            }
        }

        initialSet();
    }, []);

    const navigate = useNavigate();
    const clickStage = async (stage) => {
        if (childStage >= stage) showToast('이미 클리어한 스테이지 입니다', 'info');
        else if (childStage + 1 < stage) showToast(`${stage - 1}스테이지를 완료해야 합니다`, 'warning');
        else {
            navigate(`/child/quiz/${stage}`);
        }
    }

    return (
        <div className="h-full p-[7vh] grid grid-cols-4 gap-[5vh]">
            <div onClick={(e) => clickStage(0)} className="card bg-base-100 bg-base-100 shadow-lg border border-base-300 border-2 transition-all duration-300 hover:scale-103 hover:-translate-y-3 hover:shadow-xl">
                <div className="card-body flex flex-col justify-center items-center cursor-pointer">
                    <h1 className="text-2xl">스테이지: 0, 기본 용어</h1>
                </div>
            </div>
            {
                config.enum.map(type => {
                    const stage = config[type].stage;
                    return (
                        <div onClick={(e) => clickStage(stage)} key={stage} className="card bg-base-100 bg-base-100 shadow-lg border border-base-300 border-2 transition-all duration-300 hover:scale-103 hover:-translate-y-3 hover:shadow-xl">
                            <div className="card-body flex flex-col justify-center items-center cursor-pointer">
                                <h1 className="text-2xl">스테이지: {stage}, {config[type].korean}</h1>
                                <div className="flex flex-wrap flex-row justify-center items-center mt-5">
                                    <span className="badge m-1 badge-primary">{config[type].rootType}</span>
                                    {config[type].comment.map((com, idx) => <span className="badge m-1 badge-accent" key={idx}>{com}</span>)}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ChildStage;