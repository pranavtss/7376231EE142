import { useState, useEffect } from 'react';
import { Button, Card, Alert } from '@/components/common';
import { evaluationService } from '@/services/evaluationService';
import { formatTime } from '@/utils/helpers';
import { EvaluationStage, Question, EvaluationResponse } from '@/types';

export function Evaluation() {
  const [stages, setStages] = useState<EvaluationStage[]>([]);
  const [currentStage, setCurrentStage] = useState<EvaluationStage | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [responses, setResponses] = useState<EvaluationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadEvaluation();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && currentStage) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentStage) {
      handleSubmitStage();
    }
  }, [timeLeft, currentStage]);

  const loadEvaluation = async () => {
    setIsLoading(true);
    try {
      const evaluation = await evaluationService.getEvaluation();
      setStages(evaluation.stages);
      const notStarted = evaluation.stages.find((s) => s.status === 'not-started');
      if (notStarted) {
        loadStage(notStarted.id);
      }
    } catch {
      setError('Unable to load evaluation');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStage = async (stageId: string) => {
    try {
      const stage = await evaluationService.getStage(stageId);
      setCurrentStage(stage);
      setCurrentQuestionIndex(0);
      setResponses([]);
      if (stage.questions?.length) {
        setTimeLeft(stage.questions[0].timeLimit);
      }
    } catch {
      setError('Unable to load stage');
    }
  };

  const currentQuestion: Question | undefined = currentStage?.questions?.[currentQuestionIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    if (!currentQuestion) return;

    const existingResponse = responses.find((r) => r.questionId === currentQuestion.id);
    if (existingResponse) {
      setResponses(responses.map((r) =>
        r.questionId === currentQuestion.id ? { ...r, selectedOption: optionIndex } : r
      ));
    } else {
      setResponses([
        ...responses,
        {
          questionId: currentQuestion.id,
          selectedOption: optionIndex,
          timeSpent: currentQuestion.timeLimit - timeLeft,
        },
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (currentStage && currentQuestionIndex < currentStage.questions!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = currentStage.questions![currentQuestionIndex + 1];
      setTimeLeft(nextQuestion.timeLimit);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = currentStage!.questions![currentQuestionIndex - 1];
      setTimeLeft(prevQuestion.timeLimit);
    }
  };

  const handleSubmitStage = async () => {
    if (!currentStage) return;

    setIsLoading(true);
    try {
      await evaluationService.submitResponse(currentStage.id, responses);
      setSubmitted(true);
      setTimeout(() => {
        const nextStage = stages.find((s) => s.status === 'not-started');
        if (nextStage) {
          loadStage(nextStage.id);
          setSubmitted(false);
        }
      }, 2000);
    } catch {
      setError('Unable to submit responses');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <p className="text-gray-600">Loading evaluation...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md">
          <Alert type="error" title="Error" message={error} />
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-success-600 mb-2">✓ Submitted</h2>
          <p className="text-gray-600">Your responses have been recorded</p>
        </Card>
      </div>
    );
  }

  if (!currentStage || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Evaluations Complete</h2>
          <p className="text-gray-600">You have completed all evaluation stages</p>
          <Button variant="primary" className="mt-4" fullWidth>
            View Results
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{currentStage.name}</h1>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">{formatTime(timeLeft)}</p>
                <p className="text-sm text-gray-600">Time Left</p>
              </div>
            </div>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {currentStage.totalQuestions}
            </p>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentQuestion.text}</h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    responses.find((r) => r.questionId === currentQuestion.id)?.selectedOption ===
                    index
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        responses.find((r) => r.questionId === currentQuestion.id)?.selectedOption ===
                        index
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300'
                      }`}
                    />
                    <span className="font-medium text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </Button>

            {currentQuestionIndex < currentStage.questions!.length - 1 ? (
              <Button onClick={handleNextQuestion} variant="primary" fullWidth>
                Next →
              </Button>
            ) : (
              <Button onClick={handleSubmitStage} variant="primary" isLoading={isLoading} fullWidth>
                Submit
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
