<template>
    <div>
        <v-card>

            <v-card-title>
                <h1>New Article</h1>
            </v-card-title>

            <v-card-text>
                <v-form>
                    <v-text-field
                        label="Name"
                        v-model="name"
                        required>
                    </v-text-field>
                    <v-text-field
                        label="E-Mail"
                        v-model="mail"
                        required>
                    </v-text-field>
                    <v-text-field
                        label="Text"
                        v-model="text"
                        multi-line
                        required>
                    </v-text-field>
                    <v-btn @click="submit">Submit</v-btn>
                </v-form>
            </v-card-text>

        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from "../request";

@Component
export default class NewArticle extends Vue {

    public name = "";
    public mail = "";
    public text = "";

    public previewText(s: string) {
        const length = 60;
        return s.length > length ? s.substring(0, length - 3) + "..." : s;
    }

    public async submit() {
        const res = await request.post(`/articles`, {
            name: this.name,
            mail: this.mail,
            text: this.text
        });
        this.$router.push({ name: "article", params: { id: res.data._id } });
    }

}
</script>
