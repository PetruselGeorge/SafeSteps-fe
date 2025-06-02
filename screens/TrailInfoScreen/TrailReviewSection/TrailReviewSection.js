import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Stars from "react-native-stars";
import styles from "./styles";
import {
  getTrailReviews,
  createTrailReview,
  updateTrailReview,
  deleteTrailReview,
  getAverageTrailRating,
} from "../TrailInfoApi/api";
import { useAuth } from "../../../context/AuthContext";

const PAGE_SIZE = 5;

const TrailReviewSection = ({ trailId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const loadAverageRating = async () => {
    try {
      const { average } = await getAverageTrailRating(trailId);
      setAverageRating(average);
    } catch {
      console.warn("Could not load average rating");
    }
  };

  const loadReviews = async (reset = false) => {
    try {
      const nextPage = reset ? 0 : page;
      const data = await getTrailReviews(trailId, nextPage, PAGE_SIZE);
      const newReviews = data.content || [];

      setReviews(reset ? newReviews : [...reviews, ...newReviews]);
      setHasMore(!data.last);
      setPage(nextPage + 1);
    } catch {
      Alert.alert("Error", "Failed to load reviews.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateTrailReview(editingId, rating, comment.trim());
        setEditingId(null);
      } else {
        await createTrailReview(trailId, rating, comment.trim());
      }
      await loadAverageRating();
      setComment("");
      setRating(0);
      setPage(0);
      setHasMore(true);
      loadReviews(true);
    } catch {
      Alert.alert("Error", "Couldn't submit review.");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteTrailReview(reviewId);
      await loadAverageRating();
      setPage(0);
      setHasMore(true);
      loadReviews(true);
    } catch {
      Alert.alert("Error", "Couldn't delete review.");
    }
  };

  const renderReview = ({ item: review }) => {
    const isOwnReview = review.userEmail === user?.sub;
    return (
      <View style={styles.reviewCard}>
        <Text style={styles.reviewAuthor}>
          {review.username || "Anonymous"}
        </Text>
        <Text style={styles.reviewDate}>
          {new Date(review.createdAt).toLocaleString("en-GB")}
        </Text>
        {review.rating > 0 && (
          <Stars
            display={review.rating}
            count={5}
            spacing={4}
            starSize={16}
            fullStar={<Ionicons name="star" size={16} color="#FFD700" />}
            emptyStar={
              <Ionicons name="star-outline" size={16} color="#FFD700" />
            }
            halfStar={<Ionicons name="star-half" size={16} color="#FFD700" />}
          />
        )}
        <Text style={styles.reviewText}>{review.comment}</Text>
        {isOwnReview && (
          <View style={styles.reviewActions}>
            <TouchableOpacity
              style={[styles.reviewActionButton, styles.editButton]}
              onPress={() => {
                setComment(review.comment);
                setRating(review.rating);
                setEditingId(review.id);
              }}
            >
              <Ionicons name="create-outline" size={16} color="#A0CFFF" />
              <Text style={{ color: "#A0CFFF", marginLeft: 4 }}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.reviewActionButton, styles.deleteButton]}
              onPress={() => handleDelete(review.id)}
            >
              <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
              <Text style={{ color: "#FF6B6B", marginLeft: 4 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  useEffect(() => {
    loadReviews(true);
    loadAverageRating();
  }, [trailId]);

  return (
    <View style={styles.reviewSection}>
      <Text style={styles.reviewTitle}>Reviews</Text>

      {loading && reviews.length === 0 ? (
        <ActivityIndicator
          color="#A0CFFF"
          size="large"
          style={{ marginVertical: 30 }}
        />
      ) : (
        <>
          <View style={styles.averageRatingWrapper}>
            <Text style={styles.averageText}>Average rating:</Text>
            <Stars
              key={`avg-${averageRating}`}
              display={averageRating}
              count={5}
              spacing={4}
              starSize={20}
              fullStar={<Ionicons name="star" size={20} color="#FFD700" />}
              emptyStar={
                <Ionicons name="star-outline" size={20} color="#FFD700" />
              }
              halfStar={<Ionicons name="star-half" size={20} color="#FFD700" />}
            />
            <Text style={styles.averageText}>{averageRating}/5</Text>
          </View>

          <FlatList
            data={reviews.filter((r) => r.comment?.trim().length > 0)}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
            horizontal
            onEndReached={() => {
              if (hasMore && !loading) loadReviews();
            }}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loading ? <ActivityIndicator color="#A0CFFF" /> : null
            }
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setPage(0);
              loadReviews(true);
            }}
            style={styles.reviewScroll}
            contentContainerStyle={{ flexGrow: 1 }}
          />

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Leave a comment..."
              placeholderTextColor="#ccc"
              value={comment}
              onChangeText={setComment}
            />
            <View style={styles.ratingInputWrapper}>
              <Stars
                default={rating}
                update={(val) => setRating(val)}
                count={5}
                spacing={4}
                starSize={20}
                fullStar={<Ionicons name="star" size={20} color="#FFD700" />}
                emptyStar={
                  <Ionicons name="star-outline" size={20} color="#FFD700" />
                }
                halfStar={
                  <Ionicons name="star-half" size={20} color="#FFD700" />
                }
              />
              <Text style={styles.ratingLabel}>{rating}/5</Text>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Ionicons
                name={editingId ? "checkmark-done" : "send"}
                size={20}
                color="#fff"
              />
              <Text style={styles.submitText}>
                {editingId ? "Update" : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default TrailReviewSection;
