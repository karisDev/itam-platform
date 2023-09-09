import pickle
import json

class MakingRecs():
    __slots__ = ("_model", "_vectorizer", "_result", "_clusters")
    def __init__(self):
        with open("clustering/models/kmeans_model.pkl", "rb") as file:
            self._model = pickle.load(file)

        with open("clustering/models/vectorizer_model.pkl", "rb") as file:
            self._vectorizer = pickle.load(file)

        with open("clustering/parsed_data/result.json", "r", encoding="utf-8") as j_file:
            self._result = json.load(j_file)["items"]  # спрашенные данные

        self._clusters = self._model.labels_.tolist()

    def recommend(self, team_skills):

        # Сопоставление с командой
        team_skills_str = " ".join(team_skills)  # предполагается, что team_skills - это список навыков команды
        team_vector = self._vectorizer.transform([team_skills_str])
        closest_cluster = self._model.predict(team_vector)[0]

        # Рекомендация
        recommended_hackathons = [
            hackathon
            for hackathon, cluster in zip(self._result, self._clusters)
            if cluster == closest_cluster
            ]
        
        return recommended_hackathons
    

if __name__ == "__main__":
    test_recs = MakingRecs()
    team_skills = 'Git, Unit, ML, Data Science, Аналитика данных, отчёты, UI, UX'  # Пример данных для формирования рекомендаций
    print(test_recs.recommend(team_skills))
