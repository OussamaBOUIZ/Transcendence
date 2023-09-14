FROM nginx:alpine-slim
# ENV NODE_ENV production
# Copy built assets from builder
#COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 5173
# Start nginx
CMD ["nginx", "-g", "daemon off;"]

