import json
import pickle
from sklearn import feature_extraction, cluster

NUM_CLUSTERS = 5

with open("clustering/parsed_data/result.json", "r", encoding="utf-8") as j_file:
    result = json.load(j_file)["items"]

vectorizer = feature_extraction.text.TfidfVectorizer(stop_words=None)
X = vectorizer.fit_transform(
    [
        hackathon["Технологический фокус"]
        for hackathon in result
        if "Технологический фокус" in hackathon
    ]
)

with open("clustering/models/vectorizer_model.pkl", "wb") as file:
    pickle.dump(vectorizer, file)

model = cluster.KMeans(n_clusters=NUM_CLUSTERS)
model.fit(X)

with open("clustering/models/kmeans_model.pkl", "wb") as file:
    pickle.dump(model, file)
