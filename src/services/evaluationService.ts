import { apiClient } from './apiClient';
import {
  UserEvaluation,
  EvaluationResponse,
  EvaluationResult,
  EvaluationStage,
} from '@/types';

export const evaluationService = {
  getEvaluation: async (): Promise<UserEvaluation> => {
    const response = await apiClient.get<UserEvaluation>('/evaluation/current');
    return response.data;
  },

  getStage: async (stageId: string): Promise<EvaluationStage> => {
    const response = await apiClient.get<EvaluationStage>(`/evaluation/stages/${stageId}`);
    return response.data;
  },

  submitResponse: async (
    stageId: string,
    responses: EvaluationResponse[]
  ): Promise<EvaluationResult> => {
    const response = await apiClient.post<EvaluationResult>(
      `/evaluation/stages/${stageId}/submit`,
      { responses }
    );
    return response.data;
  },

  getResults: async (): Promise<EvaluationResult[]> => {
    const response = await apiClient.get<EvaluationResult[]>('/evaluation/results');
    return response.data;
  },

  startStage: async (stageId: string): Promise<EvaluationStage> => {
    const response = await apiClient.post<EvaluationStage>(
      `/evaluation/stages/${stageId}/start`,
      {}
    );
    return response.data;
  },
};
