<template>
  <div>
    <Feedback v-if="feedback.message !== ''" :feedback="feedback" />
    <main>
      <section>
        <div id="dropzone">
          <form id="upload-area" class="UploadArea dropzone dz-clickable">
            <div class="dz-message align-self-center">
              <img alt="upload" :src="image('upload.svg')" />
              <p class="mb-0 mt-3">
                <strong>Sleep hier bestanden om te uploaden.</strong>
                <br />
                <span> of <span>bladeren</span> om een bestand te kiezen</span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { image } from "../helpers/assets";
import Dropzone from "dropzone";
import "dropzone/dist/min/basic.min.css";
import "dropzone/dist/min/dropzone.min.css";
import Feedback from "./Feedback.vue";
import { defineComponent, ref, onMounted } from "vue";

// TODO: Auth Header...
// import { authHeader } from '@/services/auth';
export default defineComponent({
  name: "UploadArea",
  components: {
    Feedback
  },
  emits: { handleUploadProgress: null, handleFileRemoved: null, handleFileAdded: null },
  setup(_, { emit }) {
    const feedback = ref<{ message: string; variant: string }>({ message: "", variant: "" });
    let dropzone: Dropzone | null = null;

    onMounted(() => {
      dropzone = new Dropzone("#upload-area", {
        paramName: "input",
        addRemoveLinks: true,
        maxFilesize: 100,
        acceptedFiles:
          "application/pdf, image/png, image/jpeg, image/gif, image/bmp, image/tiff, image/webp, text/plain",
        url: `${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/upload-document`.replace(/([^:]\/)\/+/g, "$1") // TODO: Move to API
      });

      dropzone.on("addedfile", () => {
        feedback.value = {
          message: "",
          variant: ""
        };
        emit("handleUploadProgress", "starting");
      });

      dropzone.on("removedfile", (file: Dropzone.DropzoneFile) => {
        emit("handleFileRemoved", file);
      });

      dropzone.on("success", (file: string, response: XMLHttpRequestResponseType) => {
        feedback.value = {
          message: "",
          variant: ""
        };
        emit("handleFileAdded", file, response);
        emit("handleUploadProgress", "finished");
      });

      dropzone.on("error", (file: Dropzone.DropzoneFile, message: string, xhr: XMLHttpRequest) => {
        feedback.value = {
          message: message,
          variant: "danger"
        };

        if (file && dropzone) {
          dropzone?.removeFile(file);
        }

        emit("handleUploadProgress", "finished");
      });
    });

    return {
      feedback,
      image
    };
  }
});
</script>

<style lang="scss">
.UploadArea {
  width: 100%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 3px dashed #9ea9b8;
  user-select: none;
  cursor: pointer;
  p {
    text-align: center;
    font-size: 14px;
    color: #354052;
    font-weight: 300;
    line-height: 17px;
    strong {
      font-size: 18px;
      color: #373c41;
      font-weight: 600;
    }
    span span {
      color: #1991eb;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  // DropZone styling
  .dz-message {
    align-self: center;
  }
  &.vue-dropzone:hover {
    background-color: white;
  }
  &.vue-dropzone > .dz-preview .dz-details {
    background: #17a4ea;
  }
}
</style>
